export class TaskModel {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.taskId =
      this.tasks.length > 0 ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1;
  }

  _commit(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks(filter = 'all') {
    if (filter === 'active')
      return this.tasks.filter((task) => !task.completed);
    if (filter === 'completed')
      return this.tasks.filter((task) => task.completed);
    return this.tasks;
  }

  addTask(text) {
    const newTask = {
      id: this.taskId++,
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    this._commit(this.tasks);
    return newTask;
  }

  toggleTask(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    this._commit(this.tasks);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this._commit(this.tasks);
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }
}
