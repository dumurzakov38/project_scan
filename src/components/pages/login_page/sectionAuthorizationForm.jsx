import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { authorizationFunction } from "./components/sectionAuthorizationFunction";

import bg_section_authorizationForm from "../../../img/bg_section_authorizationForm.svg";
import icon_authorizationForm_lock_scan from "../../../img/icon_authorizationForm_lock_scan.svg";
import google_icon from "../../../img/google_icon.svg";
import facebook_icon from "../../../img/facebook_icon.svg";
import yandex_icon from "../../../img/yandex_icon.svg";

export function SectionAuthorizationForm({ setUserIsAuthorized }) {
  const formRef = useRef(null);
  const inputLoginRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const inputPasswordErrRef = useRef(null);
  const formBtnSubmitRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    authorizationFunction({
      navigate,
      setUserIsAuthorized,
      formRef,
      inputLoginRef,
      inputPasswordRef,
      inputPasswordErrRef,
      formBtnSubmitRef,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="first_section">
      <section className="content">
        <div className="authorizationForm__container">
          <div className="authorizationForm__container__content">
            <div className="authorizationForm__container__content--bg">
              <h1 className="authorizationForm__container__content--bg--h1">
                Для оформления подписки на тариф, необходимо авторизоваться.
              </h1>
              <div className="authorizationForm__container__content--bg1">
                <div className="authorizationForm__container__content--bg--containerImg">
                  <img
                    className="authorizationForm__container__content--bg--containerImg__img"
                    src={bg_section_authorizationForm}
                    alt="фон блока авторизации"
                  />
                </div>
              </div>
            </div>
            <div className="authorizationForm__container__content--form">
              <div className="authorizationForm__container__content--form--contaainerLookImg">
                <img
                  className="authorizationForm__container__content--form--contaainerLookImg__img"
                  src={icon_authorizationForm_lock_scan}
                  alt="иконка формы авторизации"
                />
              </div>
              <div className="authorizationForm__container__content--form--contaainerTypeForm">
                <button
                  className="authorizationForm__container__content--form--contaainerTypeForm--authorization"
                  title="Войти"
                >
                  Войти
                </button>
                <button
                  className="authorizationForm__container__content--form--contaainerTypeForm--registration"
                  title="Зарегистрироваться"
                >
                  Зарегистрироваться
                </button>
              </div>
              <div className="authorizationForm__container__content--form--contaainerAuthorizationForm">
                <form
                  ref={formRef}
                  className="authorizationForm__container__content--form--contaainerAuthorizationForm--FORM"
                  action="./login"
                  method="post"
                >
                  <div className="authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputLoginAndPhone">
                    <label
                      className="authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputLoginAndPhone--label"
                      for="login_and_phone"
                    >
                      Логин или номер телефона:
                    </label>
                    <input
                      ref={inputLoginRef}
                      className="authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputLoginAndPhone--Input"
                      type="text"
                      name="login_and_phone"
                      placeholder="Логин | +12345678910"
                      autoComplete="login"
                      required
                    />
                  </div>
                  <div className="authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputPassword">
                    <label
                      className="authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputPassword--Label"
                      for="password"
                    >
                      Пароль:
                    </label>
                    <input
                      ref={inputPasswordRef}
                      className="authorizationForm__container__content--form--contaainerAuthorizationForm--containerInputPassword--Input"
                      type="password"
                      name="password"
                      placeholder="Пароль"
                      autocomplete="current-password"
                      required
                    />
                    <p
                      ref={inputPasswordErrRef}
                      className="authorizationForm__container__content--form--contaainerAuthorizationForm--containerInValidValues--err"
                    >
                      Неправильный Логин или Пароль
                    </p>
                  </div>
                  <div className="authorizationForm__container__content--form--contaainerAuthorizationForm--containerButtonSubmit">
                    <button
                      ref={formBtnSubmitRef}
                      className="authorizationForm__container__content--form--contaainerAuthorizationForm--containerButtonSubmit__btn"
                      type="submit"
                      title="Войти"
                      disabled="true"
                    >
                      Войти
                    </button>
                  </div>
                </form>
                <div className="authorizationForm__container__content--form--contaainerAuthorizationForm--containerRestorePassword">
                  <button
                    className="authorizationForm__container__content--form--contaainerAuthorizationForm--containerRestorePassword__btn"
                    title="Восстановить пароль"
                  >
                    Восстановить пароль
                  </button>
                </div>
              </div>
              <div className="authorizationForm__container__content--form--contaainerAuthorizationOptions">
                <h1 className="authorizationForm__container__content--form--contaainerAuthorizationOptions--h1">
                  Войти через:
                </h1>
                <div className="authorizationForm__container__content--form--contaainerAuthorizationOptions--containerUlBtn">
                  <ul className="authorizationForm__container__content--form--contaainerAuthorizationOptions--containerUlBtn__ul">
                    <li className="authorizationForm__container__content--form--contaainerAuthorizationOptions--containerUlBtn__ul__li--google">
                      <button
                        className="authorizationForm__container__content--form--contaainerAuthorizationOptions--containerUlBtn__ul__li__btn"
                        title="Войти с помощью Google"
                      >
                        <img src={google_icon} alt="Иконка Google" />
                      </button>
                    </li>
                    <li className="authorizationForm__container__content--form--contaainerAuthorizationOptions--containerUlBtn__ul__li--facebook">
                      <button
                        className="authorizationForm__container__content--form--contaainerAuthorizationOptions--containerUlBtn__ul__li__btn"
                        title="Войти с помощью Facebook"
                      >
                        <img src={facebook_icon} alt="Иконка Facebook" />
                      </button>
                    </li>
                    <li className="authorizationForm__container__content--form--contaainerAuthorizationOptions--containerUlBtn__ul__li--yandex">
                      <button
                        className="authorizationForm__container__content--form--contaainerAuthorizationOptions--containerUlBtn__ul__li__btn"
                        title="Войти с помощью Yandex"
                      >
                        <img src={yandex_icon} alt="Иконка Yandex" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="authorizationForm__container__content--bg2">
              <div className="authorizationForm__container__content--bg--containerImg">
                <img
                  className="authorizationForm__container__content--bg--containerImg__img"
                  src={bg_section_authorizationForm}
                  alt="фон блока авторизации"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
