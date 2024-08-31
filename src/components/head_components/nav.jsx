import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import logo_scan from "../../img/logo_scan.svg";
import logo_scan_white_opacity from "../../img/logo_scan_white_opacity.svg";
import avatar_scan from "../../img/avatar_scan.jpg";
import loader_scan from "../../img/loader_scan.svg";
import menuBurgerOpen from "../../img/menuBurgerOpen.svg";
import menuBurgerClose from "../../img/menuBurgerClose.svg";
import { userInfo } from "../scripts/userInfo";

import { navFunction } from "./components/navFunction";

export function Nav({ prop, setUserIsAuthorized }) {
  const [userLimitInfo, setUserLimitInfo] = useState(false);
  const elementRef = useRef(null);

  const numberОfUsedRef = useRef(null);
  const valueTotalRef = useRef(null);
  const userNameRef = useRef(null);
  const userAvatarRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      navFunction(
        setUserLimitInfo,
        numberОfUsedRef,
        valueTotalRef,
        userNameRef,
        userAvatarRef
      );
    }
  }, [prop]);

  useEffect(() => {
    const openMenu = document.querySelector("#openMenu");
    const closeMenu = document.querySelector("#closeMenu");
    const btnMobileMenu = document.querySelectorAll(".btnMobileMenu");
    const containerMobileMenu = document.querySelector(
      ".nav__btn--mobileMenu--container"
    );
    let setOpenMobileMenu = false;

    function handleClick() {
      if (setOpenMobileMenu === false) {
        containerMobileMenu.style.display = "block";
        setOpenMobileMenu = true;
      } else {
        containerMobileMenu.style.display = "none";
        setOpenMobileMenu = false;
      }
    }

    function handleClickBtnMobile() {
      containerMobileMenu.style.display = "none";
    }

    btnMobileMenu.forEach((btn) => {
      btn.addEventListener("click", handleClickBtnMobile);
    });
    openMenu.addEventListener("click", handleClick);
    closeMenu.addEventListener("click", handleClick);

    return () => {
      btnMobileMenu.forEach((btn) => {
        btn.removeEventListener("click", handleClickBtnMobile);
      });
      openMenu.removeEventListener("click", handleClick);
      openMenu.removeEventListener("click", handleClick);
    };
  }, []);

  const logOutOfAccount = () => {
    setUserLimitInfo(false);
    setUserIsAuthorized(false);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("expire");
    sessionStorage.removeItem("usedCompanyCount");
    sessionStorage.removeItem("companyLimit");

    userInfo();
  };

  return (
    <>
      <nav>
        <div className="nav__container content">
          <div className="nav__btn--logoButton content">
            <div className="nav__logo">
              <Link to="/" title="Главная">
                <img
                  className="logo_scan_img"
                  src={logo_scan}
                  alt="Логотип сервиса 'Скан'"
                />
              </Link>
            </div>
            <div className="nav__btn--navigation">
              <ul>
                <li>
                  <Link to="/" title="Главная">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link to="/nan" title="Тарифы">
                    Тарифы
                  </Link>
                </li>
                <li>
                  <Link to="/nan" title="FAQ">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav__btn--user">
            {prop === undefined ? (
              <div className="nav__btn--user__loader--container">
                <Skeleton variant="rounded" height={60} />
              </div>
            ) : prop === true ? (
              <>
                <div
                  className="nav__btn--user__info--container"
                  ref={elementRef}
                >
                  <div
                    className={
                      userLimitInfo
                        ? "nav__btn--user__info--container__limit limit__container__content"
                        : "nav__btn--user__info--container__limit limit__container__content limit__none"
                    }
                  >
                    <div className="nav__btn--user__info--container__limit__content">
                      <div className="nav__btn--user__info--container__limit--numberОfUsed">
                        <div>
                          <p className="nav__btn--user__info--container__limit--text__numberОfUsed">
                            Использовано компаний
                          </p>
                        </div>
                        <div className="nav__btn--user__info--container__limit--number__container">
                          <p
                            ref={numberОfUsedRef}
                            className="nav__btn--user__info--container__limit--number__container--numberОfUsed"
                          ></p>
                        </div>
                      </div>
                      <div className="nav__btn--user__info--container__limit--valueTotal">
                        <div>
                          <p class="nav__btn--user__info--container__limit--text__numberОfUsed">
                            Лимит по компаниям
                          </p>
                        </div>
                        <div className="nav__btn--user__info--container__limit--number__container">
                          <p
                            ref={valueTotalRef}
                            className="nav__btn--user__info--container__limit--number__container--valueTotal"
                          ></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      userLimitInfo
                        ? "nav__btn--user__info--container__limit limit__container__loader limit__none"
                        : "nav__btn--user__info--container__limit limit__container__loader"
                    }
                  >
                    <img
                      className={
                        "nav__btn--user__info--container__limit--loader" +
                        (userLimitInfo ? "" : " loaderAnimation")
                      }
                      src={loader_scan}
                      title="Загрузка"
                      alt="Лоадер"
                    />
                  </div>
                </div>
                <div className="nav__btn--user__info--container__profile">
                  <div className="nav__btn--user__info--container__profile--text">
                    <p ref={userNameRef}></p>
                    <button title="выйти" onClick={logOutOfAccount}>
                      Выйти
                    </button>
                  </div>
                  <div className="nav__btn--user__info--container__profile--img">
                    <img ref={userAvatarRef} />
                  </div>
                </div>
              </>
            ) : (
              <div className="nav__btn--user__container identification">
                <Link to="/nan">
                  <button
                    className="nav__btn--user__reg"
                    title="Зарегистрироваться"
                  >
                    Зарегистрироваться
                  </button>
                </Link>
                <div className="nav__btn--user__trait"></div>
                <Link to="/login">
                  <button className="nav__btn--user__auth" title="Войти">
                    Войти
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="nav__btn--mobileMenu">
            <div className="nav__btn--mobileMenu--btn">
              <button id="openMenu" title="Открыть меню">
                <img src={menuBurgerOpen} alt="Открыть меню" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="nav__btn--mobileMenu--container">
        <div className="nav__btn--mobileMenu--container__content content">
          <div className="nav__btn--mobileMenu--container__content--nav">
            <div>
              <img
                className="logo_scan_img"
                src={logo_scan_white_opacity}
                alt="Логотип сервиса 'Скан'"
              />
            </div>
            <button id="closeMenu" title="Закрыть меню">
              <img src={menuBurgerClose} alt="Закрыть меню" />
            </button>
          </div>
          <div className="nav__btn--mobileMenu--container__content--main">
            <div className="nav__btn--mobileMenu--container__content--main--button">
              <div className="nav__btn--mobileMenu--container__content--main--button--containerBtnNavigation">
                <div className="nav__btn--mobileMenu--container__content--main--button--containerBtnNavigation__containerBtn mobileNavigationBtnHome">
                  <Link
                    to="/"
                    className="nav__btn--mobileMenu--container__content--main--button--containerBtnNavigation__containerBtn__home btnMobileMenu"
                    title="Главная"
                  >
                    Главная
                  </Link>
                </div>
                <div className="nav__btn--mobileMenu--container__content--main--button--containerBtnNavigation__containerBtn mobileNavigationBtnTarifs">
                  <Link
                    to="/nan"
                    className="nav__btn--mobileMenu--container__content--main--button--containerBtnNavigation__containerBtn__tarifs btnMobileMenu"
                    title="Тарифы"
                  >
                    Тарифы
                  </Link>
                </div>
                <div className="nav__btn--mobileMenu--container__content--main--button--containerBtnNavigation__containerBtn mobileNavigationBtnFaq">
                  <Link
                    to="/nan"
                    className="nav__btn--mobileMenu--container__content--main--button--containerBtnNavigation__containerBtn__faq btnMobileMenu"
                    title="FAQ"
                  >
                    FAQ
                  </Link>
                </div>
              </div>
              <div className="nav__btn--mobileMenu--container__content--main--button--containerBtnAuthorizationAndRegistration">
                <div className="nav__btn--mobileMenu--container__content--main--button--containerBtnAuthorizationAndRegistration__containerRegistration">
                  <Link to="/nan">
                    <button
                      className="nav__btn--mobileMenu--container__content--main--button--containerBtnAuthorizationAndRegistration__containerRegistration__btn btnMobileMenu"
                      title="Зарегистрироваться"
                    >
                      Зарегистрироваться
                    </button>
                  </Link>
                </div>
                <div className="nav__btn--mobileMenu--container__content--main--button--containerBtnAuthorizationAndRegistration__containerAuthorization">
                  <Link to="/login">
                    <button
                      className="nav__btn--mobileMenu--container__content--main--button--containerBtnAuthorizationAndRegistration__containerAuthorization__btn btnMobileMenu"
                      title="Войти"
                    >
                      Войти
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
