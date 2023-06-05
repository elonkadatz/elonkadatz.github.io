let timerInterval;
let sessionCountdown;
let breakCountdown;
let currentSession = 0;
let sessions = document.getElementById('sessions').value;
let sessionDuration = document.getElementById('sessionDuration').value;
let breakDuration = document.getElementById('breakDuration').value;
const timerElement = document.querySelector('.timer');
const timerStateElement = document.querySelector('.timer-state');
const sessionsCompletedElement = document.querySelector('.sessions-completed');
let timerTextElement = document.querySelector('.timer-label');


function startTimer() {
  sessions = document.getElementById('sessions').value;
  sessionDuration = document.getElementById('sessionDuration').value;
  breakDuration = document.getElementById('breakDuration').value;

  currentSession = 1;
  sessionCountdown = sessionDuration * 60;
  breakCountdown = breakDuration * 60;

  updateSessionsCompleted();

  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function updateTimer() {
    if (sessionCountdown > 0) {
      sessionCountdown--;
      updateTimerDisplay(sessionCountdown);
      if (sessionCountdown === 0) {
        timerStateElement.textContent = 'Break';
        playBreakNotificationSound();
      }
      const totalSeconds = sessionDuration * 60;
      const progress = (totalSeconds - sessionCountdown) / totalSeconds;
      const translateX = progress * 100;
      timerElement.style.transform = `translateX(${translateX}%)`;
    } else if (breakCountdown > 0) {
      breakCountdown--;
      updateTimerDisplay(breakCountdown);
      const totalSeconds = breakDuration * 60;
      const progress = (totalSeconds - breakCountdown) / totalSeconds;
      const translateY = progress * 100;
      timerElement.style.transform = `translateY(${100 - translateY}%)`;
    }
  
    updateSessionsCompleted(); // Move the updateSessionsCompleted() call here
  
    if (sessionCountdown === 0 && breakCountdown === 0) {
      if (currentSession < sessions) {
        currentSession++;
        sessionCountdown = sessionDuration * 60;
        breakCountdown = breakDuration * 60;
        timerStateElement.textContent = 'Work';
        playSessionNotificationSound();
      } else {
        currentSession++;
        clearInterval(timerInterval);
        playBreakNotificationSound();
        alert('All sessions completed!');
        updateSessionsCompleted(); // Call updateSessionsCompleted() again after the alert
      }
    }
  }
  

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${padZero(minutes)}:${padZero(remainingSeconds)}`;
    timerTextElement.textContent = formattedTime;
  }
  
function padZero(value) {
  return value.toString().padStart(2, '0');
}

function playSessionNotificationSound() {
  const sessionSound = document.getElementById('sessionSound');
  sessionSound.play();
}

function playBreakNotificationSound() {
  const breakSound = document.getElementById('breakSound');
  breakSound.play();
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateSessionsCompleted() {
  sessionsCompletedElement.textContent = `Sessions Completed: ${currentSession - 1} / ${sessions}`;
}
