import ExpenseBoardPresenter from "./presenter/expense-board-presenter.js";
import FormAddExpenseComponent from "./view/expense-form-component.js";
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/model.js';
import { StatusLabel } from './const.js';


const boardContainer = document.querySelector(".expense-list");
const taskboardSection = document.getElementById("expense-list");
const formContainer = document.querySelector(".expense-form");

const statusList = Object.entries(StatusLabel).map(([statusId, label]) => ({
    statusId,
    label
}));

const tasksModel = new TasksModel();
const tasksBoardPresenter = new ExpenseBoardPresenter(
    {
        boardContainer: boardContainer,
        tasksModel,
        statusList
    }
)


const formAddExpenseComponent = new FormAddExpenseComponent({
    onClick: handleNewTaskClick
});

function handleNewTaskClick() {
    tasksBoardPresenter.createTask();
}

render(formAddExpenseComponent, formContainer);

tasksBoardPresenter.init()