export class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscapeClose = this._handleEscapeClose.bind(this);
      this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
      this._popup.classList.add('popup_visible');
      document.addEventListener('keydown', this._handleEscapeClose);
      this._popup.addEventListener('click', this._handleOverlayClose);
  }

  close() {
      this._popup.classList.remove('popup_visible');
      document.removeEventListener('keydown', this._handleEscapeClose);
      this._popup.removeEventListener('click', this._handleOverlayClose);
  }

   _handleOverlayClose(evt) {
      if (evt.target === this._popup) {
          this.close();
      }
  }

  _handleEscapeClose(evt) {
      if (evt.key === 'Escape') {
          this.close();
      }
  }

  setEventListeners() {
      this._popup.querySelector('.popup__close').addEventListener('click', () => {
          this.close();
      });
  }
}