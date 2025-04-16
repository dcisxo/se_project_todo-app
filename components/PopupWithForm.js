import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
   constructor(popupSelector, handleFormSubmit) {
     super(popupSelector);
     this._handleFormSubmit = handleFormSubmit;
     this._form = this._popup.querySelector('.popup__form');
   }
 
   _getInputValues() {
      const inputs = this._form.querySelectorAll('.popup__input');
      const values = {};
      inputs.forEach(input => {
         values[input.name] = input.value;
      });
      return values;
   }
 
   setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
         const inputValues = this._getInputValues();
         this._handleFormSubmit(inputValues);
      });
   }
 
   close() {
     super.close();
       this._form.reset();
   }
 }