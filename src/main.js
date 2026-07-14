import './style.css';
import { TaskModel } from './models/TaskModel.js';
import { TaskView } from './views/TaskView.js';
import { TaskController } from './controllers/TaskController.js';

const app = new TaskController(new TaskModel(), new TaskView());
