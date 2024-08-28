import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Keyboard,
  Navigation,
  Mousewheel,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import strelka from "../../../../img/strelka.png";
import loader_scan from "../../../../img/loader_scan.svg";

export function Slider_results() {
  const [swiperLoading, setSwiperLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(6);
  const [resizeCompleted, setResizeCompleted] = useState(false);
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const [newsData, setNewsData] = useState();

  let activeIndex = 0;
  let isLastSlide = false;

  useEffect(() => {
    const interval = setInterval(() => {
      const data = sessionStorage.getItem("summary");

      if (data) {
        const news = JSON.parse(data);
        setNewsData(news);
        setSwiperLoading(false);
      } else {
        setSwiperLoading(true);
      }
    }, 100);

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (containerWidth !== null) {
      let slidesToShow = 6;

      if (containerWidth <= 500) {
        slidesToShow = 1;
      } else if (containerWidth <= 790) {
        slidesToShow = 2;
      } else if (containerWidth <= 950) {
        slidesToShow = 3;
      } else if (containerWidth <= 1010) {
        slidesToShow = 4;
      } else if (containerWidth <= 1150) {
        slidesToShow = 5;
      }

      setSlidesPerView(slidesToShow);
      setResizeCompleted(true);
    }
  }, [containerWidth]);

  const slideNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
      activeIndex += 1;
      isLastSlide = activeIndex === newsData.length - 1;
    }
  };

  const slidePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
      activeIndex -= 1;
      isLastSlide = activeIndex === 0;
    }
  };

  return (
    <div className="result__container__content--summary__container--containerSlider">
      <div
        className="result__container__content--summary__container--containerSlider__container parent"
        ref={containerRef}
      >
        <div className="result__container__content--summary__container--containerSlider__container--slider">
          <div className="result__container__content--summary__container--containerSlider__container--slider__containerSlider">
            <div className="result__container__content--summary__container--containerSlider__container--slider__containerSlider__containerText">
              <p className="result__container__content--summary__container--containerSlider__container--slider__containerSlider__containerText--pPeriod">
                Период
              </p>
              <p className="result__container__content--summary__container--containerSlider__container--slider__containerSlider__containerText--pTotal">
                Всего
              </p>
              <p className="result__container__content--summary__container--containerSlider__container--slider__containerSlider__containerText--pRisks">
                Риски
              </p>
            </div>
            {!swiperLoading ? (
              <Swiper
                modules={[Pagination, Keyboard, Navigation, Mousewheel, A11y]}
                slidesPerView={newsData.length !== 1 ? slidesPerView : 1}
                mousewheel={{ invert: true }}
                keyboard={{ enabled: true, onlyInViewport: false }}
                ref={swiperRef}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
              >
                {newsData.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    id={index}
                    className="child result__container__content--summary__container--containerSlider__container--slider__containerSlider__containerSlides__slide"
                  >
                    <div className="result__container__content--summary__container--containerSlider__container--slider__containerSlider__containerSlides__slide--year">
                      <h1 className="result__container__content--summary__container--containerSlider__container--slider__containerSlider__containerSlides__slide--h1Date">
                        {item.date}
                      </h1>
                    </div>
                    <div className="result__container__content--summary__container--containerSlider__container--slider__containerSlider__containerSlides__slide--count">
                      <h3 className="result__container__content--summary__container--containerSlider__container--slider__containerSlider__containerSlides__slide--h1Count">
                        {item.total}
                      </h3>
                      <h3 className="result__container__content--summary__container--containerSlider__container--slider__containerSlider__containerSlides__slide--h1Risks">
                        {item.risk}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="result__container__content--summary__container--containerSlider__container--slider__containerSlider__containerLoader">
                <div>
                  <img
                    className={swiperLoading ? " loaderAnimation" : ""}
                    src={loader_scan}
                    title="Загрузка"
                    alt="Лоадер"
                  />
                  <p>Загружаем данные </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {!swiperLoading && resizeCompleted ? (
          <div className="result__container__content--summary__container--containerSlider__container--btn">
            <button
              className={`swiper-button-prev swiper-rtl ${
                activeIndex === 0 ? "swiper-button-disabled" : ""
              }`}
              onClick={slidePrev}
            >
              <img src={strelka} alt="Назад" />
            </button>
            <button
              className={`swiper-button-next swiper-rtl ${
                isLastSlide ? "swiper-button-disabled" : ""
              }`}
              onClick={slideNext}
            >
              <img src={strelka} alt="Вперед" />
            </button>
          </div>
        ) : (
          <div className="result__container__content--summary__container--containerSlider__container--btn">
            <button
              className={`swiper-button-prev swiper-rtl swiper-button-disabled`}
              onClick={slidePrev}
              disabled={true}
            >
              <img src={strelka} alt="Назад" />
            </button>
            <button
              className={`swiper-button-next swiper-rtl swiper-button-disabled`}
              onClick={slideNext}
              disabled={true}
            >
              <img src={strelka} alt="Вперед" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
