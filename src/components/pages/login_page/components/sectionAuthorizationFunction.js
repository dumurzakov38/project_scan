import { processingDataAuthorization } from "../../../scripts/processingDataAuthorization";

export function authorizationFunction({
  navigate,
  setUserIsAuthorized,
  formRef,
  inputLoginRef,
  inputPasswordRef,
  inputPasswordErrRef,
  formBtnSubmitRef,
  dispatch,
  setMessage,
  clearMessage,
}) {
  const form = formRef.current;
  const inputLogin = inputLoginRef.current;
  const inputPassword = inputPasswordRef.current;
  const inputPasswordErr = inputPasswordErrRef.current;
  const formBtnSubmit = formBtnSubmitRef.current;

  let btnDisebeld = true;

  function renderErrMess(err) {
    if (err === true) {
      inputPasswordErr.style.display = "block";
    } else {
      inputPasswordErr.style.display = "none";
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

    return processingDataAuthorization({
      userData,
      navigate,
      setUserIsAuthorized,
      dispatch,
      setMessage,
      clearMessage,
    });
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const responseQuery = await authorization();

    if (responseQuery.errorCode === 401) {
      renderErrMess(true);
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
