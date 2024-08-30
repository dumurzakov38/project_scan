import { processingData_Authorization } from "../../../scripts/processingData_Authorization";

export function authorizationFunction(navigate) {
  const form = document.querySelector(
      ".authorizationForm__container__content--form--contaainerAuthorizationForm--FORM"
    ),
    inputLogin = document.querySelector(
      ".authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputLoginAndPhone--Input"
    ),
    inputPassword = document.querySelector(
      ".authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputPassword--Input"
    ),
    inputPasswordErr = document.querySelector(
      ".authorizationForm__container__content--form--contaainerAuthorizationForm--containerInValidValues--err"
    ),
    formBtnSubmit = document.querySelector(
      ".authorizationForm__container__content--form--contaainerAuthorizationForm--containerButtonSubmit__btn"
    );

  let btnDisebeld = true;

  function renderErrMess(err, errAllValues) {
    if (err === true) {
      inputLogin.style.border = "1px solid #FF5959";
      inputLogin.style.color = "#FF5959";
      inputPasswordErr.style.display = "block";
    } else {
      inputLogin.style.border = "1px solid #C7C7C7";
      inputLogin.style.color = "";
      inputPasswordErr.style.display = "none";
    }

    if (errAllValues === true) {
      inputPassword.style.border = "1px solid #FF5959";
      inputPassword.style.color = "#FF5959";
    } else {
      inputPassword.style.border = "1px solid #C7C7C7";
      inputPassword.style.color = "";
    }
  }

  function handleInput() {
    const input = inputLogin.value;

    if (input.charAt(0) === "+" && /^\+\d+$/.test(input)) {
      renderErrMess(false);
      btnDisebeld = false;
    } else if (input.charAt(0) === "+" && !/^\+\d+$/.test(input)) {
      renderErrMess(true);
      btnDisebeld = true;
    } else {
      renderErrMess(false);
      btnDisebeld = false;
    }
  }

  function handleBtnSubmit() {
    if (
      inputLogin.value.length > 0 &&
      inputPassword.value.length > 0 &&
      btnDisebeld === false
    ) {
      formBtnSubmit.disabled = false;
      formBtnSubmit.style.cursor = "pointer";
      formBtnSubmit.style.background = "#5970FF";
    } else {
      formBtnSubmit.disabled = true;
      formBtnSubmit.style.cursor = "not-allowed";
      formBtnSubmit.style.background = "#9da6da";
    }
  }

  form.addEventListener("input", () => {
    handleInput();
    handleBtnSubmit();
  });

  formBtnSubmit.addEventListener("click", (event) => {
    handleInput();
  });

  function authorization(params) {
    const userData = {
      loginNumber: inputLogin.value,
      password: inputPassword.value,
    };

    return processingData_Authorization(userData, navigate);
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const responseQuery = await authorization();

    if (responseQuery.errorCode === 401) {
      renderErrMess(true, true);
      return;
    }

    form.reset();
    handleBtnSubmit();
    return "true";
  });

  return () => {
    inputLogin.removeEventListener("keydown");
  };
}
