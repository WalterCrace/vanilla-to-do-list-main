export class TaskView {
  constructor() {
    this.taskInput = document.getElementById('taskInput');
    this.addBtn = document.getElementById('addBtn');
    this.taskList = document.getElementById('taskList');
    this.statsDiv = document.getElementById('stats');
    this.filterButtons = document.querySelectorAll('.filter-btn');
  }

  get taskText() {
    return this.taskInput.ariaValueMax.trim();
  }

  clearInput() {
    this.taskInput.value = '';
  }

  displayTasks(tasks) {
    this.taskList.innerHTML = '';

    if (tasks.length === 0) {
      this.taskList.innerHTML =
        '<p style="text-aling: center; color: #999; padding: 20px;">No hay tareas para mostrar</p>';
      return;
    }

    tasks.forEach((task) => {
      const taskDiv = document.createElement('div');
      taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;

      taskDiv.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button class="complete-btn" data-id="${task.id}"
            ${task.completed ? 'Reactivar' : 'Completar'}
        </button>
        <button class="delete-btn" data-id="${task.id}">Eliminar</button>
      </div>
      `;
      this.taskList.appendChild(taskDiv);
    });
  }

  displayStats(stats) {
    this.statsDiv.innerHTML = `Total: ${stats.total} | Completadas: ${stats.completed} | Activas: ${stats.active}`;
  }

  updateFilterButtons(activeFilter) {
    this.filterButtons.forEach((btn) => {
      if (btn.getAttribute('data-filter') === activeFilter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  bindAddTask(handler) {
    const handleAdd = () => {
      if (this.taskText) {
        handler(this.taskText);
        this.clearInput();
      } else {
        alert('Por favor escribe una tarea');
      }
    };

    this.addBtn.addEventListener('click', handleAdd);
    this.taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleAdd();
    });
  }

  bindToggleTask(handler) {
    this.taskList.addEventListener('click', (e) => {
      if (e.target.classList.contains('complete-btn')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        handler(id);
      }
    });
  }

  bindDeleteTask(handler) {
    this.taskList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        handler(id);
      }
    });
  }

  bindFilterTasks(handler) {
    this.filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        handler(btn.getAttribute('data-filter'));
      });
    });
  }
}
