import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
 
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_visible");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};
 
const generateTodo = (data) => {
  const todo = new Todo(data, todoTemplate);
  return todo.getView();
};
 
const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

const todoFormValidator = new FormValidator(validationConfig, addTodoForm);
todoFormValidator.enableValidation();
 
const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscClose);
};
 
const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscClose);
};
 
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});
 
addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});
 
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const nameInput = addTodoForm.elements.name.value;
  const dateInput = addTodoForm.elements.date.value;
  
 
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
 
  const values = { 
    name: nameInput,
    date: date,
    id: uuidv4()
  };

  renderTodo(values);
  closeModal(addTodoPopup);
  evt.target.reset();
  todoFormValidator.resetValidation();
});
 
initialTodos.forEach((item) => {
  renderTodo(item);
});