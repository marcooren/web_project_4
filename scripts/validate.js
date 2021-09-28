const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input-error_active",
  errorClass: "form__input_error",
};

const showError = (inputElement, settings) => {
  const { inputErrorClass, errorClass } = settings;
  const errorMessage = inputElement.validationMessage;
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputErrorClass);
};
const hideError = (inputElement, settings) => {
  const { inputErrorClass, errorClass } = settings;
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  inputElement.classList.remove(errorClass);
};

const checkValidity = (inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showError(inputElement, settings);
  } else {
    hideError(inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (
  inputList,
  buttonElement,
  settings,
  resetIndicator = false
) => {
  const { inactiveButtonClass } = settings;
  if (hasInvalidInput(inputList) || resetIndicator) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = "disabled";
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, settings) => {
  const { inputSelector, submitButtonSelector } = settings;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValidity(inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const { formSelector, ...rest } = settings;
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => evt.preventDefault());
  });

  forms.forEach((form) => {
    setEventListeners(form, settings);
  });
};

enableValidation(settings);
