 
export function clearTasks(container) {
  container.innerHTML = '';
}

export function renderTasks(container, tasks) {
  tasks.forEach(task => {
    const li = document.createElement('div');
    li.className = 'flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox mr-2';
    checkbox.dataset.taskId = task.id;
    checkbox.checked = task.done;

    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = task.done ? 'line-through text-gray-400' : '';
    span.classList.add('flex-1');

    const delBtn = document.createElement('button');
    delBtn.className = 'task-delete text-red-500 hover:text-red-700 ml-2';
    delBtn.dataset.taskId = task.id;
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    container.appendChild(li);
  });

// mobile first
 
}

export function renderEmptyState(container) {
  const emptyDiv = document.getElementById('empty-state');
  if (emptyDiv) {
    emptyDiv.classList.remove('hidden');
  }
}
