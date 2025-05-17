import { AbstractComponent } from '../framework/view/abstract-component.js';


function createFormAddTaskComponentTemplate() {
    return (
        `<form id="expense-form">
            <label for="expense-name">Наименование расхода:</label>
            <input type="text" id="expense-name" placeholder="Например, еда" required />
            <label for="expense-amount">Стоимость:</label>
            <input type="number" id="expense-amount" placeholder="Amount" required />
            
            <fieldset class="expense-category-dropdown">
                <legend>Категория:</legend>
                <select name="expense-category" required>
                    <option value="" disabled selected>Выберите категорию</option>
                    <option value="Food">Еда</option>
                    <option value="Transport">Транспорт</option>
                    <option value="Entertainment">Развлечения</option>
                    <option value="Other">Другое</option>
                </select>
            </fieldset>

            <button type="submit">Добавить расходы</button>
        </form>
        `
    );
}


export default class FormAddExpenseComponent extends AbstractComponent {
    #handleClick = null;

    constructor({ onClick }) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
    }

    get template() {
        return createFormAddTaskComponentTemplate();
    }

    #clickHandler = (event) => {
        event.preventDefault();
        this.#handleClick();
    }
}