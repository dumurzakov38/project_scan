import { processingData_Authorization } from "../../../scripts/processingData_Authorization";

export function authorizationFunction(navigate) {
    const form = document.querySelector('.authorizationForm__container__content--form--contaainerAuthorizationForm--FORM'),
    inputLogin = document.querySelector('.authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputLoginAndPhone--Input'),
    inputPassword = document.querySelector('.authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputPassword--Input'),
    inputLoginErr = document.querySelector('.authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputLoginAndPhone--Input--err'),
    inputPasswordErr = document.querySelector('.authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputPassword--Input--err'),
    formBtnSubmit = document.querySelector('.authorizationForm__container__content--form--contaainerAuthorizationForm--containerButtonSubmit__btn');

    let btnDisebeld = true;
    
    function handleInput() {
        const input = inputLogin.value;

        if (input.charAt(0) === '+' && /^\+\d+$/.test(input)) {
            inputLogin.style.border = "1px solid #C7C7C7";
            inputLogin.style.color = "";
            inputLoginErr.style.display = "none";
            btnDisebeld = false;
        } else if (input.charAt(0) === '+' && !/^\+\d+$/.test(input)) {
            inputLogin.style.border = "1px solid #FF5959";
            inputLogin.style.color = "#FF5959";
            inputLoginErr.style.display = "block";
            btnDisebeld = true;
        } else {
            inputLogin.style.border = "1px solid #C7C7C7";
            inputLogin.style.color = "";
            inputLoginErr.style.display = "none";
            btnDisebeld = false;
        }
    }

    function handleBtnSubmit() {
        if (inputLogin.value.length > 0 && inputPassword.value.length > 0 && btnDisebeld === false) {
            formBtnSubmit.disabled = false;
            formBtnSubmit.style.cursor = "pointer";
            formBtnSubmit.style.background = "#5970FF"
        } else {
            formBtnSubmit.disabled = true;
            formBtnSubmit.style.cursor = "not-allowed";
            formBtnSubmit.style.background = "#9da6da"
        }
    }

    form.addEventListener('input', () => {
        handleInput();
        handleBtnSubmit();
    });
    
    formBtnSubmit.addEventListener('click', (event) => {
        handleInput();
    }); 


    function authorization(params) {
        const data = {
            loginNumber: inputLogin.value,
            password: inputPassword.value
        }

        processingData_Authorization(data);
    }
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();//
        authorization();
        form.reset();
        handleBtnSubmit();
        return("true");
    });

    return () => {
        inputLogin.removeEventListener('keydown');
    };
}


