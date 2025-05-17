import { AbstractComponent } from '../framework/view/abstract-component.js';


function createExpenseboardAddComponentTemplate() {
    return (
        `<div id="expense-list">
                
        </div>`
    );
}


export default class ExpenseBoardAddComponent extends AbstractComponent {
    get template() {
        return createExpenseboardAddComponentTemplate();
    }
}