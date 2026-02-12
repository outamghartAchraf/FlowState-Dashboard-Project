 

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

}
