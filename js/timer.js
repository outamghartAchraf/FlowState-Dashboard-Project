 const alarmSound = new Audio('/assets/alarm.mp3');   


export function initTimer() {
  const display = document.getElementById('timer-display');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');
  const skipBtn = document.getElementById('skip-btn');
  const cycleCountEl = document.getElementById('cycle-count');
  const sessionStatus = document.getElementById('session-status').querySelector('span');

    let workTime = 1 * 60; 
  let breakTime = 5 * 60; 
  let time = workTime;
  let interval = null;
  let isWork = true;
  let cycles = 0;

  function updateDisplay() {
    const m = Math.floor(time / 60);
    const s = time % 60;
    display.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    sessionStatus.textContent = isWork ? 'Session de travail' : 'Pause';
  }


      function updateStartButton(isRunning) {
    if (!startBtn) return;
    if (isRunning) {
      startBtn.innerHTML = `<i class="fa-solid fa-pause"></i><span>Pause</span>`;
      startBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
      startBtn.classList.add('bg-yellow-600', 'hover:bg-yellow-700');
    } else {
      startBtn.innerHTML = `<i class="fa-solid fa-play"></i><span>Démarrer</span>`;
      startBtn.classList.remove('bg-yellow-600', 'hover:bg-yellow-700');
      startBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }
  }


    function startTimer() {
    if (interval) return;
    updateStartButton(true);

    interval = setInterval(() => {
      if (time > 0) {
        time--;
        updateDisplay();
      } else {
        clearInterval(interval);
        interval = null;
          alarmSound.play();

    ت
        if (isWork) cycles++;
        isWork = !isWork;
        time = isWork ? workTime : breakTime;
        updateDisplay();
        cycleCountEl.textContent = cycles;

         
        startTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(interval);
    interval = null;
    updateStartButton(false);
  }

    function resetTimer() {
    pauseTimer();
    isWork = true;
    time = workTime;
    updateDisplay();
  }

    function skipTimer() {
    pauseTimer();
    isWork = !isWork;
    time = isWork ? workTime : breakTime;
    if (!isWork) cycles++;
    cycleCountEl.textContent = cycles;
    updateDisplay();

    console.log('work');
  }


}
