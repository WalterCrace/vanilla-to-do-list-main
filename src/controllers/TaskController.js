export class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentFilter = 'all';

    this.view.bindAddTask(this.handleAdd.bind(this));
    this.view.bindToggleTask(this.handleToggle.bind(this));
    this.view.bindDeleteTask(this.handleDelete.bind(this));
    this.view.bindFilterTask(this.handleFilter.bind(this));

    this.updateView();
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
