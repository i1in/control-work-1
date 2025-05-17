import { AbstractComponent } from '../framework/view/abstract-component.js';


function createExpenseAddComponentTemplate(task) {
    const { id, title, status, amount } = task;
    return (
        `
        <div class="task-item task task--${status}" data-id="${id}">
          <div class="task__body">
            <p class="task-title">${title}</p>
            <p class="task-amount">${amount}руб.</p>
          </div>
        `
    );
}


export default class ExpenseAddComponent extends AbstractComponent {

    constructor({ task }) {
        super();
        this.task = task;

        console.log(task)
    }


    get template() {
        return createExpenseAddComponentTemplate(this.task);
    }
}