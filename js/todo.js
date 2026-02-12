import { saveTasks, loadTasks } from './storage.js';
import { renderTasks, clearTasks, renderEmptyState } from './ui.js';

let tasks = loadTasks() || [];

const isValidTask = (text) => /^[a-zA-Z0-9\s]+$/.test(text.trim());

export function initTodo() {
  const taskInput = document.getElementById('task-input');
  const addBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  const addTaskHandler = () => {
    const text = taskInput.value.trim();
 
    if (!isValidTask(text)) {
      alert('Titre invalide Seulement lettres et chiffres.');
      return;
    }

    const newTask = { id: Date.now().toString(), text, done: false };
    tasks.push(newTask);
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
  });

  render();
}

function toggleTask(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);
  saveTasks(tasks);
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks(tasks);
  render();
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

  

}
