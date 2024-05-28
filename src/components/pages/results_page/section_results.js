import React, { useState, useEffect } from "react";
import { Slider_results } from "./components/slider_results";
import { RenderNews } from "./components/renderNews";
import { NumberOfOptions } from "./components/numberOfOptions";
import { processingData_GetPublications } from "../../scripts/processingData_GetPublications";

import bg_section_results from "../../../img/bg_section_results.svg";

export function Section_results(params) {
    const[renderNews, setRenderNews] = useState(false);
    const[renderBtnLoadMore, setRenderBtnLoadMore] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            const dataNews = sessionStorage.getItem('news');
            const dataId = sessionStorage.getItem('idPublications');


            if (dataNews) {
                if (JSON.parse(dataNews).length === JSON.parse(dataId).length) {
                    setRenderBtnLoadMore(false);
                } else {
                    setRenderBtnLoadMore(true);
                }

                setRenderNews(true);
            } else {
                setRenderNews(false);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClick = () => {
        processingData_GetPublications('lazy');
    };
      
    return (
        <main className="first_section">
            <section className="content">
                <div className="result__container">
                    <div className="result__container__content__">
                        <div className="result__container__content--main">
                            <div className="result__container__content--main--container--text">
                                <h1>Ищем. Скоро будут результаты</h1>
                                <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
                            </div>
                            <div className="result__container__content--main--container--img">
                                <img src={bg_section_results}/>
                            </div>
                        </div>
                        <div className="result__container__content--summary">
                            <div className="result__container__content--summary__container">
                                <h4 className="result__container__content--summary__container--h4">Общая сводка</h4>
                                <NumberOfOptions/>
                                <Slider_results/>
                            </div>
                        </div>
                        <div className="result__container__content--documentation">
                            <div className="result__container__content--documentation--containerH4">
                                <h4>Список документов</h4>
                            </div>
                            {!renderNews ? (
                                <></>
                            ):(
                                <>
                                    <div className="result__container__content--documentation--containerMain">
                                        <RenderNews/>
                                    </div>
                                    {!renderBtnLoadMore ? (
                                        <></>
                                    ):(
                                        <div className="result__container__content--documentation--containerButton">
                                            <button onClick={handleClick}>Показать больше</button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}