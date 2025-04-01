import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";

class TodoApp {
  constructor() {
    this._addTodoButton = document.querySelector(".button_action_add");
    this._addTodoPopup = document.querySelector("#add-todo-popup");
    this._addTodoForm = this._addTodoPopup.querySelector(".popup__form");
    this._addTodoCloseBtn = this._addTodoPopup.querySelector(".popup__close");
    this._todoTemplate = document.querySelector("#todo-template");
    this._todosList = document.querySelector(".todos__list");

    this._todoFormValidator = new FormValidator(
      validationConfig,
      this._addTodoForm
    );

    this._setEventListeners();
    this._initializeTodos();
  }

  _setEventListeners() {
    this._addTodoButton.addEventListener("click", () =>
      this._openModal(this._addTodoPopup)
    );
    this._addTodoCloseBtn.addEventListener("click", () =>
      this._closeModal(this._addTodoPopup)
    );
    this._addTodoForm.addEventListener("submit", (evt) =>
      this._handleFormSubmit(evt)
    );
  }

  _openModal(modal) {
    modal.classList.add("popup_visible");
  }

  _closeModal(modal) {
    modal.classList.remove("popup_visible");
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = { name, date, id: uuidv4() };
    const todoInstance = new Todo(values, this._todoTemplate);
    const todo = todoInstance.getView();
    this._todosList.append(todo);
    this._closeModal(this._addTodoPopup);
    evt.target.reset();
    this._todoFormValidator.resetValidation();
  }

  _initializeTodos() {
    initialTodos.forEach((item) => {
      const todoInstance = new Todo(item, this._todoTemplate);
      const todo = todoInstance.getView();
      this._todosList.append(todo);
    });
  }

  initialize() {
    this._todoFormValidator.enableValidation();
  }
}

const todoApp = new TodoApp();
todoApp.initialize();
