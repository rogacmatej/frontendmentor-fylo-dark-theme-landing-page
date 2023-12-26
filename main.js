class SignupForm {
  /** @type {HTMLFormElement}*/
  #form = document.getElementById('signup-form');
  /** @type {HTMLInputElement} */
  #email = document.getElementById('email');

  constructor() {
    this.#form.addEventListener('submit', this.#validate.bind(this));
  }

  /**
   * @param {Event} event
   * @return {void}
   */
  #validate(event) {
    const isValidEmail = this.#validateEmail();

    if (!isValidEmail) {
      event.preventDefault();
    }
  }

  /**
   * @return {void}
   */
  #validateEmail() {
    if (this.#email.value.trim() === '' || this.#email.validity.valueMissing) {
      this.#addErrorState(this.#email, 'Please enter an Email');
      return false;
    } else if (this.#email.validity.typeMismatch) {
      this.#addErrorState(this.#email, 'Sorry, invalid format here');
      return false;
    } else {
      this.#removeErrorState(this.#email);
      return true;
    }
  }

  /**
   *
   * @param {HTMLInputElement | HTMLTextAreaElement} formElement
   * @param {string} message
   * @return {void}
   */
  #addErrorState(formElement, message) {
    const errorMessageElement = formElement.nextElementSibling;

    formElement.setAttribute('aria-invalid', 'true');

    if (errorMessageElement instanceof HTMLElement) {
      errorMessageElement.innerText = message;
      errorMessageElement.removeAttribute('hidden');
    } else {
      return;
    }
  }

  /**
   *
   * @param {HTMLInputElement | HTMLTextAreaElement} formElement
   * @return {void}
   */
  #removeErrorState(formElement) {
    const errorMessageElement = formElement.nextElementSibling;

    formElement.setAttribute('aria-invalid', 'false');

    if (errorMessageElement instanceof HTMLElement) {
      errorMessageElement.innerText = '';
      errorMessageElement.setAttribute('hidden', 'hidden');
    } else {
      return;
    }
  }
}

new SignupForm();
