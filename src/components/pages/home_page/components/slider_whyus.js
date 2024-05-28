import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard, Navigation, Mousewheel, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/mousewheel';
import strelka from "../../../../img/strelka.png";

export function Slider_whyus({ data }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const swiperRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            setActiveIndex(swiperRef.current.swiper.realIndex);
            setIsLastSlide(swiperRef.current.swiper.isEnd);
        }
    }, [windowWidth]);

    const slideNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const slidePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    return (
        <div className="section_whyus--slider__container">
            <div className="section_whyus--slider__container--slider">
                <Swiper
                    modules={[Pagination, Keyboard, Navigation, Mousewheel, A11y]}
                    slidesPerView={windowWidth <= 790 ? 1 : 3}
                    centerInsufficientSlides={true}
                    mousewheel={{ invert: true }}
                    keyboard={{ enabled: true, onlyInViewport: false }}
                    ref={swiperRef}
                    navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                >
                    {data.map((item, index) => (
                        <SwiperSlide key={index} id={index} className="child section_whyus--whyusSlider">
                            <div className="section_whyus--whyusSlider__container">
                                <img src={item.img} alt={item.img_alt} />
                                <p>{item.p}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <button className={`swiper-button-prev swiper-rtl ${activeIndex === 0 ? 'swiper-button-disabled' : ''}`} onClick={slidePrev}>
                <img src={strelka} alt="Назад" />
            </button>
            <button className={`swiper-button-next swiper-rtl ${isLastSlide ? 'swiper-button-disabled' : ''}`} onClick={slideNext}>
                <img src={strelka} alt="Вперед" />
            </button>
        </div>
    );
}
