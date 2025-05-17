import { AbstractComponent } from '../framework/view/abstract-component.js';

function createExpenseboardListTemplate(status) {
    const { statusId, label } = status;
    return (
        `
        <div class="task-board__list" id="${statusId}">
            <h2 class="task-list__title">${label}</h2>
        </div>
        `
    );
}

export default class ExpenseListComponent extends AbstractComponent {
    constructor({ status, tasksModel }) {
        super();
        this.status = status;
        this.tasksModel = tasksModel;
    }

    get template() {
        return createExpenseboardListTemplate(this.status);
    }
}