import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const todoTemplate = document.querySelector("#todo-template");
const addTodoForm = document.forms["add-todo-form"];
const todoCounter = new TodoCounter(initialTodos, '.counter__text');

const generateTodo = (data) => {
  const todo = new Todo(data, todoTemplate, todoCounter);
  return todo.getView();
 };

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    todoSection.addItem(todoElement);
  },
  containerSelector: '.todos__list'
});

const addTodoPopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const date = new Date(formData.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  
  const values = {
    name: formData.name,
    date: date,
    id: uuidv4(),
    completed: false,
  };
  
  const todoElement = generateTodo(values);
  todoSection.addItem(todoElement);
  todoCounter.updateTotal(true);
  addTodoPopup.close();
  todoFormValidator.resetValidation();
});

const todoFormValidator = new FormValidator(validationConfig, addTodoForm);
todoFormValidator.enableValidation();

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

todoSection.renderItems();