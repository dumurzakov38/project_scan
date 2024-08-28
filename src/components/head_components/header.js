import React from "react";
import { Link } from "react-router-dom";
import header_content_img_scan from "../../img/header_content_img_scan.svg";

export function Header(props) {
  return (
    <>
      <header>
        <div className="header content">
          <div className="header__content">
            <div className="header__content--text">
              <div>
                <h1 className="header__content--text--h1">
                  сервис по поиску публикаций
                  <br />о компании
                  <br /> по его ИНН
                </h1>
                <p className="header__content--text--p">
                  Комплексный анализ публикаций, получение данных в формате PDF
                  на электронную почту.
                </p>
              </div>
              {props.userIsAuthorized ? (
                <Link to="/search" className="header__content--text--button">
                  <button title="Запросить данные">Запросить данные</button>
                </Link>
              ) : (
                <></>
              )}
            </div>
            <div className="header__content--img">
              <img
                className="header_content_img_scan"
                src={header_content_img_scan}
                alt=""
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
