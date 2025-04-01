import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export class Todo {
  constructor(data, selector) {
    this.id = data.id || uuidv4();
    this.name = data.name || "New Todo";
    this.completed = data.completed || false;
    this.date = data.date || null;
    this._templateSelector = selector;
  }

  _setEventListeners(todoElement) {
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");

    todoDeleteBtn.addEventListener("click", () => {
      todoElement.remove();
    });

    todoCheckboxEl.addEventListener("click", () => {
      this.completed = todoCheckboxEl.checked;
    });
  }

  getView() {
    const todoElement = this._templateSelector.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDate = todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this.name;
    todoCheckboxEl.checked = this.completed;

    todoCheckboxEl.id = `todo-${this.id}`;
    todoLabel.setAttribute("for", `todo-${this.id}`);

    const dueDate = new Date(this.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners(todoElement);

    return todoElement;
  }
}
