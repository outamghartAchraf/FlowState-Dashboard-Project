import { saveTasks, loadTasks } from './storage.js';
import { renderTasks, clearTasks } from './ui.js';

let tasks = loadTasks() || [];
let Editid = null;

let taskInput;
let addBtn;

const isValidTask = (text) => /^[a-zA-Z0-9\s]+$/.test(text.trim());

export function initTodo() {
  taskInput = document.getElementById('task-input');
  addBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  const addTaskHandler = () => {
    const text = taskInput.value.trim();

    if (!isValidTask(text)) {
      showToast('Titre invalide', 'error');
      return;
    }

    if (Editid) {
      tasks = tasks.map(task =>
        task.id === Editid ? { ...task, text } : task
      );
      Editid = null;
      addBtn.textContent = 'Add';
      showToast('Task updated');
    } 
    
    else {
      const newTask = {
        id: Date.now().toString(),
        text,
        done: false
      };
      tasks.push(newTask);
      showToast('Task added successfully');

    }

    saveTasks(tasks);
    render();
    taskInput.value = '';
  };

  addBtn.addEventListener('click', addTaskHandler);

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTaskHandler();
  });

  taskList.addEventListener('click', (e) => {
    const target = e.target;

     
    if (target.classList.contains('task-checkbox')) {
      toggleTask(target.dataset.taskId);
    }

    
    if (target.closest('.task-delete')) {
      const btn = target.closest('.task-delete');
      if (confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
        deleteTask(btn.dataset.taskId);
      }
    }

    
    if (target.closest('.task-edit')) {
      const btn = target.closest('.task-edit');
      EditTask(btn.dataset.taskId);
      

    }
  });

  render();
}

 
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  saveTasks(tasks);
  render();
}

 
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks(tasks);
  render();
  showToast('Task deleted ', 'error');

}

 function EditTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  taskInput.value = task.text;
  Editid = id;
  addBtn.textContent = 'Update';
}

 
function render() {
  const taskList = document.getElementById('task-list');
  clearTasks(taskList);

  const emptyDiv = document.getElementById('empty-state');

  if (tasks.length === 0) {
    if (emptyDiv) emptyDiv.classList.remove('hidden');
  } else {
    if (emptyDiv) emptyDiv.classList.add('hidden');
    renderTasks(taskList, tasks);
  }

  // Stats
  const completed = tasks.filter(t => t.done).length;

  document.getElementById('completed-count').textContent = completed;
  document.getElementById('total-count').textContent = tasks.length;
  document.getElementById('stat-active').textContent =
    tasks.filter(t => !t.done).length;
  document.getElementById('stat-completed').textContent = completed;
  document.getElementById('stat-success').textContent =
    tasks.length
      ? Math.round((completed / tasks.length) * 100) + '%'
      : '0%';
}


function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');

  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `
    px-4 py-2 rounded shadow-md text-white transition-all duration-300
    ${type === 'success' ? 'bg-green-500' : ''}
    ${type === 'error' ? 'bg-red-500' : ''}
   
  `;

  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
