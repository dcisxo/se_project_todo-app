import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export class Todo {
  constructor(data, selector, todoCounter) {
    this.id = data.id || uuidv4();
    this.name = data.name || "New Todo";
    this.completed = data.completed || false;
    this.date = data.date || null;
    this._templateSelector = selector;
    this._todoCounter = todoCounter;

    this._createTodoElement();
  }

  _createTodoElement() {
    this._todoElement = this._templateSelector.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
        if (this.completed) {
            this._todoCounter.updateCompleted(false);
        }
        this._todoCounter.updateTotal(false);
        this._todoElement.remove();
    });
   
    this._todoCheckboxEl.addEventListener("click", () => {
      this.completed = this._todoCheckboxEl.checked;
      // Pass true when checking, false when unchecking
      this._todoCounter.updateCompleted(this._todoCheckboxEl.checked);
     });
   }

  getView() {
    this._todoNameEl.textContent = this.name;
    this._todoCheckboxEl.checked = this.completed;
    this._todoCheckboxEl.id = `todo-${this.id}`;
    this._todoLabel.setAttribute("for", `todo-${this.id}`);

    const dueDate = new Date(this.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners();

    return this._todoElement;
  }
}
