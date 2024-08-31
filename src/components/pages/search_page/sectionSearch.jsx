import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { searchFunction } from "./components/sectionSearchFunction";
import { SectionResults } from "../results_page/sectionResults";

import bg_section_search_document_scan from "../../../img/bg_section_search_document_scan.svg";
import bg_section_search_folders_scan from "../../../img/bg_section_search_folders_scan.svg";
import bg_section_search_scan from "../../../img/bg_section_search_scan.svg";

export function SectionSearch() {
  const [renderResults, setRenderResults] = useState(false);
  const formRef = useRef(null);
  const formBtnSubmitRef = useRef(null);
  const inputFormRef = useRef(null);
  const inputInnRef = useRef(null);
  const selectToneRef = useRef(null);
  const inputQuantityInIssueRef = useRef(null);
  const inputDateRange1Ref = useRef(null);
  const inputDateRange2Ref = useRef(null);
  const markerErrInnRef = useRef(null);
  const markerErrDateRangeRef = useRef(null);
  const messageErrInnRef = useRef(null);
  const messageErrDateRangeRef = useRef(null);
  const allcheckboxRef = useRef([]);

  useEffect(() => {
    if (
      formRef.current &&
      formBtnSubmitRef.current &&
      inputFormRef.current &&
      inputInnRef.current &&
      selectToneRef.current &&
      inputQuantityInIssueRef.current &&
      inputDateRange1Ref.current &&
      inputDateRange2Ref.current &&
      markerErrInnRef.current &&
      markerErrDateRangeRef.current &&
      messageErrInnRef.current &&
      messageErrDateRangeRef.current &&
      allcheckboxRef.current
    ) {
      searchFunction(
        setRenderResults,
        formRef,
        formBtnSubmitRef,
        inputFormRef,
        inputInnRef,
        selectToneRef,
        inputQuantityInIssueRef,
        inputDateRange1Ref,
        inputDateRange2Ref,
        markerErrInnRef,
        markerErrDateRangeRef,
        messageErrInnRef,
        messageErrDateRangeRef,
        allcheckboxRef
      );
    }
    window.scrollTo(0, 0);
  }, [!renderResults === false]);

  const setCheckboxRef = (el) => {
    if (el && !allcheckboxRef.current.includes(el)) {
      allcheckboxRef.current.push(el);
    }
  };

  return [
    !renderResults ? (
      <main className="first_section">
        <section className="content">
          <div className="search__container">
            <div className="search__container__content">
              <div className="search__container__content--head">
                <div className="search__container__content--head--text">
                  <h1 className="search__container__content--head--text--h1">
                    Найдите необходимые данные в пару кликов.
                  </h1>
                  <p className="search__container__content--head--text--p">
                    Задайте параметры поиска. Чем больше заполните, тем точнее
                    поиск
                  </p>
                </div>
                <div className="search__container__content--head--img">
                  <div className="search__container__content--head--img--document">
                    <img
                      src={bg_section_search_document_scan}
                      alt="Фоновое изображение"
                    />
                  </div>
                  <div className="search__container__content--head--img--folders">
                    <img
                      src={bg_section_search_folders_scan}
                      alt="Фоновое изображение"
                    />
                  </div>
                </div>
              </div>
              <div className="search__container__content--main">
                <div className="search__container__content--main--form">
                  <form
                    ref={formRef}
                    className="search__container__content--main--form--FORM"
                    method="post"
                    action="/asd"
                  >
                    <div className="search__container__content--main--form__container">
                      <div
                        ref={inputFormRef}
                        className="search__container__content--main--form__container--input"
                      >
                        <div className="search__container__content--main--form__container--input__container--inn">
                          <label className="search__container__content--main--form__container--input__container--inn--label">
                            ИНН компании
                            <p
                              ref={markerErrInnRef}
                              className="search__container__content--main--form__container--input__container--inn--label__symbol"
                            >
                              *
                            </p>
                          </label>
                          <div className="search__container__content--main--form__container--input__container--errContainer">
                            <input
                              ref={inputInnRef}
                              className="search__container__content--main--form__container--input__container--inn--input"
                              type="text"
                              placeholder="10 цифр"
                              minlength="10"
                              maxlength="10"
                              required
                            />
                            <div className="search__container__content--main--form__container--input__container--errContainer--p">
                              <p
                                ref={messageErrInnRef}
                                className="search__container__content--main--form__container--input__container--inn--input--err"
                              >
                                Введите корректные данные
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="search__container__content--main--form__container--input__container--tone">
                          <label className="search__container__content--main--form__container--input__container--tone--label">
                            Тональность
                          </label>
                          <select
                            ref={selectToneRef}
                            className="search__container__content--main--form__container--input__container--tone--select"
                          >
                            <option value="any" selected>
                              Любая
                            </option>
                            <option value="positive">Позитивная</option>
                            <option value="negative">Негативная</option>
                          </select>
                        </div>
                        <div className="search__container__content--main--form__container--input__container--quantityInIssue">
                          <label className="search__container__content--main--form__container--input__container--quantityInIssue--label">
                            Количество документов в выдаче
                            <p className="search__container__content--main--form__container--input__container--quantityInIssue--label__symbol">
                              *
                            </p>
                          </label>
                          <div className="search__container__content--main--form__container--input__container--errContainer">
                            <input
                              ref={inputQuantityInIssueRef}
                              className="search__container__content--main--form__container--input__container--quantityInIssue--input quantityAsaResult"
                              type="text"
                              placeholder="От 1 до 1000"
                              required
                            />
                            <div className="search__container__content--main--form__container--input__container--errContainer--p">
                              <p className="search__container__content--main--form__container--input__container--quantityInIssue--input--err">
                                Обязательное поле
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="search__container__content--main--form__container--input__container--dateRange">
                          <label className="search__container__content--main--form__container--input__container--dateRange--label">
                            Диапазон поиска
                            <p
                              ref={markerErrDateRangeRef}
                              className="search__container__content--main--form__container--input__container--dateRange--label__symbol"
                            >
                              *
                            </p>
                          </label>
                          <div className="search__container__content--main--form__container--input__container--errContainer search__container__content--main--form__container--input__container--errContainer__dateRange">
                            <input
                              ref={inputDateRange1Ref}
                              className="search__container__content--main--form__container--input__container--dateRange--input1"
                              type="date"
                              title="Дата начала поиска"
                              required
                            />
                            <input
                              ref={inputDateRange2Ref}
                              className="search__container__content--main--form__container--input__container--dateRange--input2"
                              type="date"
                              title="Дата конца поиска"
                              required
                            />
                            <div className="search__container__content--main--form__container--input__container--errContainer--p">
                              <p
                                ref={messageErrDateRangeRef}
                                className="search__container__content--main--form__container--input__container--dateRange--input--err"
                              >
                                Введите корректные данные
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="search__container__content--main--form__container--checkbox">
                        <div className="search__container__content--main--form__container--checkbox--containerCheckbox">
                          <label className="search__container__content--main--form__container--checkbox--containerCheckbox__container">
                            <input
                              className="search__container__content--main--form__container--checkbox--containerCheckbox__container--input"
                              type="checkbox"
                              data-info="maxFullness"
                              ref={setCheckboxRef}
                            />
                            <span class="checkmark"></span>
                            <p className="search__container__content--main--form__container--checkbox--containerCheckbox__container--p maxFullness">
                              Признак максимальной полноты
                            </p>
                          </label>
                          <label className="search__container__content--main--form__container--checkbox--containerCheckbox__container">
                            <input
                              className="search__container__content--main--form__container--checkbox--containerCheckbox__container--input"
                              type="checkbox"
                              data-info="inBusinessNews"
                              ref={setCheckboxRef}
                            />
                            <span class="checkmark"></span>
                            <p className="search__container__content--main--form__container--checkbox--containerCheckbox__container--p inBusinessNews">
                              Упоминания в бизнес-контексте
                            </p>
                          </label>
                          <label className="search__container__content--main--form__container--checkbox--containerCheckbox__container">
                            <input
                              className="search__container__content--main--form__container--checkbox--containerCheckbox__container--input"
                              type="checkbox"
                              data-info="onlyMainRole"
                              ref={setCheckboxRef}
                            />
                            <span class="checkmark"></span>
                            <p className="search__container__content--main--form__container--checkbox--containerCheckbox__container--p onlyMainRole">
                              Главная роль в публикации
                            </p>
                          </label>
                          <label className="search__container__content--main--form__container--checkbox--containerCheckbox__container">
                            <input
                              className="search__container__content--main--form__container--checkbox--containerCheckbox__container--input"
                              type="checkbox"
                              data-info="riskFactors"
                              ref={setCheckboxRef}
                            />
                            <span class="checkmark"></span>
                            <p className="search__container__content--main--form__container--checkbox--containerCheckbox__container--p riskFactors">
                              Публикации только с риск-факторами
                            </p>
                          </label>
                          <label className="search__container__content--main--form__container--checkbox--containerCheckbox__container">
                            <input
                              className="search__container__content--main--form__container--checkbox--containerCheckbox__container--input"
                              type="checkbox"
                              data-info="isTechNews"
                              ref={setCheckboxRef}
                            />
                            <span class="checkmark"></span>
                            <p className="search__container__content--main--form__container--checkbox--containerCheckbox__container--p isTechNews">
                              Включать технические новости рынков
                            </p>
                          </label>
                          <label className="search__container__content--main--form__container--checkbox--containerCheckbox__container">
                            <input
                              className="search__container__content--main--form__container--checkbox--containerCheckbox__container--input"
                              type="checkbox"
                              data-info="isAnnouncement"
                              ref={setCheckboxRef}
                            />
                            <span class="checkmark"></span>
                            <p className="search__container__content--main--form__container--checkbox--containerCheckbox__container--p isAnnouncement">
                              Включать анонсы и календари
                            </p>
                          </label>
                          <label className="search__container__content--main--form__container--checkbox--containerCheckbox__container">
                            <input
                              className="search__container__content--main--form__container--checkbox--containerCheckbox__container--input"
                              type="checkbox"
                              data-info="isDigest"
                              ref={setCheckboxRef}
                            />
                            <span class="checkmark"></span>
                            <p className="search__container__content--main--form__container--checkbox--containerCheckbox__container--p isDigest">
                              Включать сводки новостей
                            </p>
                          </label>
                        </div>
                        <div className="search__container__content--main--form__container--checkbox--containerButton">
                          <div className="search__container__content--main--form__container--checkbox--containerButton__container">
                            <div className="search__container__content--main--form__container--checkbox--containerButton__container__content">
                              <div className="search__container__content--main--form__container--checkbox--containerButton__container__content--btnContainer">
                                <button
                                  ref={formBtnSubmitRef}
                                  className="search__container__content--main--form__container--checkbox--containerButton__container__content--btnContainer__btn"
                                  title="Поиск"
                                  disabled="true"
                                >
                                  Поиск
                                </button>
                              </div>
                              <p className="search__container__content--main--form__container--checkbox--containerButton__container__content--p">
                                * Обязательные к заполнению поля
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="search__container__content--main--bg">
                  <div className="search__container__content--main--bg__container">
                    <img
                      className="search__container__content--main--bg__container__img"
                      src={bg_section_search_scan}
                      alt="Фоновое изображение"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    ) : (
      <SectionResults />
    ),
  ];
}
