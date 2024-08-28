import { event } from "jquery";
import { processingData_SerchPublications } from "../../../scripts/processingData_SerchPublications";
import { validateInn } from "./validator_inn";

export function searchFunction([renderResults, setRenderResults]) {
  const form = document.querySelector(
      ".search__container__content--main--form--FORM"
    ),
    formBtnSubmit = document.querySelector(
      ".search__container__content--main--form__container--checkbox--containerButton__container__content--btnContainer__btn"
    );

  const inputForm = document.querySelector(
      ".search__container__content--main--form__container--input"
    ),
    inputInn = document.querySelector(
      ".search__container__content--main--form__container--input__container--inn--input"
    ),
    selectTone = document.querySelector(
      ".search__container__content--main--form__container--input__container--tone--select"
    ),
    inputQuantityInIssue = document.querySelector(
      ".search__container__content--main--form__container--input__container--quantityInIssue--input"
    ),
    inputDateRange1 = document.querySelector(
      ".search__container__content--main--form__container--input__container--dateRange--input1"
    ),
    inputDateRange2 = document.querySelector(
      ".search__container__content--main--form__container--input__container--dateRange--input2"
    ),
    markerErrInn = document.querySelector(
      ".search__container__content--main--form__container--input__container--inn--label__symbol"
    ),
    markerErrDateRange = document.querySelector(
      ".search__container__content--main--form__container--input__container--dateRange--label__symbol"
    ),
    messageErrInn = document.querySelector(
      ".search__container__content--main--form__container--input__container--inn--input--err"
    ),
    messageErrDateRange = document.querySelector(
      ".search__container__content--main--form__container--input__container--dateRange--input--err"
    );

  // Чекбоксы
  const allcheckbox = document.querySelectorAll(
    ".search__container__content--main--form__container--checkbox--containerCheckbox__container--input"
  );

  // State
  let validValueInn = false,
    validValueDateRange = false;

  function handleInput() {
    const inpInn = inputInn.value,
      inpDateRange1 = inputDateRange1.value,
      inpDateRange2 = inputDateRange2.value;

    // Проверка ИНН
    if (/^\d+$/.test(inpInn) && validateInn(inpInn) === true) {
      validValueInn = true;
      inputInn.style.border = "1px solid #C7C7C7";
      inputInn.style.color = "#949494";
      markerErrInn.style.color = "#949494";
      messageErrInn.style.display = "none";
    } else {
      validValueInn = false;
      if (inpInn.length > 0) {
        inputInn.style.border = "1px solid #FF5959";
        inputInn.style.color = "#FF5959";
        markerErrInn.style.color = "#FF5959";
        messageErrInn.style.display = "flex";
      } else {
        inputInn.style.border = "1px solid #C7C7C7";
        inputInn.style.color = "#949494";
        markerErrInn.style.color = "#949494";
        messageErrInn.style.display = "none";
      }
    }

    function checkValue() {
      const inputValue = inputQuantityInIssue.value;

      if (/^\d*$/.test(inputValue)) {
        if (inputValue !== "") {
          const numericValue = parseInt(inputValue, 10);

          if (numericValue < 1) {
            inputQuantityInIssue.value = "";
          } else if (numericValue > 1000) {
            inputQuantityInIssue.value = 1000;
          }
        }
      } else {
        inputQuantityInIssue.value = inputQuantityInIssue.value.slice(0, -1);
      }
    }

    // Проверка дат
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1; // добавляем 1, так как месяцы начинаются с 0
    const day = todayDate.getDate();

    const inpDateRange1Y = parseInt(inpDateRange1.slice(0, 4)),
      inpDateRange1M = parseInt(inpDateRange1.slice(5, 7)),
      inpDateRange1D = parseInt(inpDateRange1.slice(8, 10));

    const inpDateRange2Y = parseInt(inpDateRange2.slice(0, 4)),
      inpDateRange2M = parseInt(inpDateRange2.slice(5, 7)),
      inpDateRange2D = parseInt(inpDateRange2.slice(8, 10));

    if (inpDateRange1 === "" || inpDateRange2 === "") {
      validValueDateRange = false;
    } else if (
      inpDateRange1Y > inpDateRange2Y ||
      inpDateRange1M > inpDateRange2M
    ) {
      validValueDateRange = false;
      inputDateRange1.style.border = "1px solid #FF5959";
      inputDateRange2.style.border = "1px solid #FF5959";
      inputDateRange1.style.color = "#FF5959";
      inputDateRange2.style.color = "#FF5959";
      markerErrDateRange.style.color = "#FF5959";
      messageErrDateRange.style.display = "flex";
    } else if (
      inpDateRange1Y > year ||
      (inpDateRange1Y === year && inpDateRange1M > month) ||
      (inpDateRange1Y === year &&
        inpDateRange1M === month &&
        inpDateRange1D > day) ||
      inpDateRange2Y > year ||
      (inpDateRange2Y === year && inpDateRange2M > month) ||
      (inpDateRange2Y === year &&
        inpDateRange2M === month &&
        inpDateRange2D > day)
    ) {
      validValueDateRange = false;
      inputDateRange1.style.border = "1px solid #FF5959";
      inputDateRange2.style.border = "1px solid #FF5959";
      inputDateRange1.style.color = "#FF5959";
      inputDateRange2.style.color = "#FF5959";
      markerErrDateRange.style.color = "#FF5959";
      messageErrDateRange.style.display = "flex";
    } else {
      validValueDateRange = true;
      inputDateRange1.style.border = "1px solid #C7C7C7";
      inputDateRange2.style.border = "1px solid #C7C7C7";
      inputDateRange1.style.color = "#949494";
      inputDateRange2.style.color = "#949494";
      markerErrDateRange.style.color = "#949494";
      messageErrDateRange.style.display = "none";
    }

    checkValue();
  }

  function renderBtnSubmit() {
    if (
      inputQuantityInIssue.value.length > 0 &&
      validValueInn === true &&
      inputInn.value.length === 10 &&
      validValueDateRange === true
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

  inputForm.addEventListener("input", () => {
    handleInput();
    renderBtnSubmit();
  });

  allcheckbox.forEach((input) => {
    input.addEventListener("click", (event) => {
      const nameCheckbox = document.querySelector(
        "." + input.getAttribute("data-info")
      );

      if (nameCheckbox) {
        if (input.checked) {
          nameCheckbox.classList.add("activeCheckbox");
        } else {
          nameCheckbox.classList.remove("activeCheckbox");
        }
      } else {
        console.log("Target element not found");
      }
    });
  });

  function processingData(params) {
    // Инициализация переменных для чекбоксов
    let maxFullness = false;
    let inBusinessNews = false;
    let onlyMainRole = false;
    let riskFactors = false;
    let isTechNews = false;
    let isAnnouncement = false;
    let isDigest = false;

    // Проверка состояния чекбоксов
    if (document.querySelector(".maxFullness").checked) {
      maxFullness = true;
    }
    if (document.querySelector(".inBusinessNews").checked) {
      inBusinessNews = true;
    }
    if (document.querySelector(".onlyMainRole").checked) {
      onlyMainRole = true;
    }
    if (document.querySelector(".riskFactors").checked) {
      riskFactors = true;
    }
    if (document.querySelector(".isTechNews").checked) {
      isTechNews = true;
    }
    if (document.querySelector(".isAnnouncement").checked) {
      isAnnouncement = true;
    }
    if (document.querySelector(".isDigest").checked) {
      isDigest = true;
    }

    // Формирование объекта данных
    const data = {
      inn: inputInn.value,
      ttonality: selectTone.value,
      limit: inputQuantityInIssue.value,
      startDate: inputDateRange1.value,
      endDate: inputDateRange2.value,
      checkbox: {
        maxFullness: maxFullness,
        inBusinessNews: inBusinessNews,
        onlyMainRole: onlyMainRole,
        riskFactors: riskFactors,
        isTechNews: isTechNews,
        isAnnouncement: isAnnouncement,
        isDigest: isDigest,
      },
    };

    processingData_SerchPublications(data);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    handleInput();
    renderBtnSubmit();
    processingData();

    setRenderResults(true);

    form.reset();
  });
}
