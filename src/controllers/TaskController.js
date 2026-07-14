export class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentFilter = 'all';

    this.view.bindAddTask(this.handleAdd.bind(this));
    this.view.bindToggleTask(this.handleToggle.bind(this));
    this.view.bindDeleteTask(this.handleDelete.bind(this));
    this.view.bindFilterTasks(this.handleFilter.bind(this));

    this.updateView();
  }

  updateView() {
    const tasks = this.model.getTasks(this.currentFilter);
    const stats = this.model.getStats();

    this.view.displayTasks(tasks);
    this.view.displayStats(stats);
    this.view.updateFilterButtons(this.currentFilter);
  }

  handleAdd(text) {
    this.model.addTask(text);
    this.updateView();
  }

  handleToggle(id) {
    this.model.toggleTask(id);
    this.updateView();
  }

  handleDelete(id) {
    this.model.deleteTask(id);
    this.updateView();
  }

  handleFilter(filter) {
    this.currentFilter = filter;
    this.updateView();
  }
}
