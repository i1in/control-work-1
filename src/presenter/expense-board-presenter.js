import ExpenseboardAddComponent from "../view/expense-board-component.js";
import ExpenseListComponent from "../view/expense-list-component.js";
import ExpenseAddComponent from "../view/expense-component.js";
import { render } from "../framework/render.js";

export default class ExpenseBoardPresenter {
    #boardContainer = null;
    #tasksModel = null; 

    #tasksBoardComponent = new ExpenseboardAddComponent();

    #boardTasks = [];

    #statusList = [];

    constructor({boardContainer, tasksModel, statusList}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#statusList = statusList;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));

        console.log(boardContainer)
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks]

        this.#renderBoard();
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);
        this.#renderTasksList();
    }

    #renderTasksList() {
        this.#statusList.forEach((statusItem) => {
            const tasksListComponent = new ExpenseListComponent({
                status: statusItem,
                tasksModel: this.#tasksModel,
            });

            render(tasksListComponent, this.#tasksBoardComponent.element);

            const tasksForStatus = this.#tasksModel.getTasksByStatus(statusItem.statusId)

            tasksForStatus.forEach((task) => {
                this.#renderTask(task, tasksListComponent.element);
            });
        });
    }

    #renderTask(task, container) {
        const taskComponent = new ExpenseAddComponent({task});
        
        render(taskComponent, container)
    }

    // #renderClearButton(container) {
    //     const clearButton = new ClearButtonComponent({
    //         onClick: this.clearTrashbin
    //     });

    //     render(clearButton, container)
    // }

    createTask() {
        const expenseName = document.querySelector('#expense-name').value.trim();
        const expenseAmount = document.querySelector('#expense-amount').value.trim();
        const expenseCategory = document.querySelector('select[name="expense-category"]').value;
      
        if (!expenseName || !expenseAmount || !expenseCategory) {
          return;
        }
      
        this.#tasksModel.addTask(expenseName, expenseCategory, expenseAmount);
        
        document.querySelector('#expense-name').value = '';
        document.querySelector('#expense-amount').value = '';
        document.querySelector('select[name="expense-category"]').value = '';
    }

    // clearTrashbin() {
    //     this.#tasksModel.deleteTrashbinTasks();
    // }

    #handleModelChange(){
        this.#clearBoard();
        this.#renderBoard();
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }
}