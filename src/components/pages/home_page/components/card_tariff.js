import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Card_tariff(props) {
    const tariffsContent = props.props.map((tariff, index) => {
        const { tariff_header, tariff_price, included_in_the_tariff, included_in_the_tariff_logo, active_tariff } = tariff;
        const { price, discounted_price, installment_plan, currency } = tariff_price;
        const { tariff_name, for_whom_tariff, tariff_logo, tariff_logo_alt, color_header, color_text } = tariff_header;

        // style
        let Tariff_container;
        let Tariff_header;
        let Tariff_container_content_btn;

        if (active_tariff === 1) {
            Tariff_container = styled.div`
                position: relative;
                border-radius: 10px;
                border: 2px solid ${color_header};
                background: #FFF;
                box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.20);
            `;

            Tariff_header = styled.div`
                background: ${color_header};
                color: ${color_text};
                border-top-right-radius: 0px;
                border-top-left-radius: 0px;
            `;

            Tariff_container_content_btn = styled.button`
                padding: 18px 40px 17px 45px;
                border-radius: 5px;
                background: #D2D2D2;
            `;
        } else {
            Tariff_container = styled.div`
                position: relative;
                border-radius: 10px;
                background: #FFF;
                box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.20);
            `;

            Tariff_header = styled.div`
                background: ${color_header};
                color: ${color_text};
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
        `;

        Tariff_container_content_btn = styled.button`
            padding: 18px 40px 17px 45px;
            border-radius: 5px;
            background: #5970FF;
        `;
        }
        // style

        return (
            <Tariff_container key={index} className="section__tariff--slider__container__cart ">
                <div className="section__tariff--slider__container__cart__content">
                    <Tariff_header className="section__tariff--slider__container__cart__content--head">
                        <div className="section__tariff--slider__container__cart__content--head--text">
                            <h1>{tariff_name}</h1>
                            <p>{for_whom_tariff}</p>
                        </div>
                        <div className="section__tariff--slider__container__cart__content--head--img">
                            <img className="" src={tariff_logo} alt={tariff_logo_alt} />
                        </div>
                    </Tariff_header>
                    <div className="section__tariff--slider__container__cart__content--main">
                        <div className="section__tariff--slider__container__cart__content--main--tariff_price">
                            <div className="section__tariff--slider__container__cart__content--main--tariff_price__container">
                                <div className="section__tariff--slider__container__cart__content--main--tariff_price__container--span"> 
                                    {active_tariff ? (
                                            <span>Текущий тариф</span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className="section__tariff--slider__container__cart__content--main--tariff_price__container__price">
                                    <div className="section__tariff--slider__container__cart__content--main--tariff_price__container--price">
                                        <p className="section__tariff--slider__container__cart__content--main--tariff_price__container--price--value">{price}</p>
                                        <p className="section__tariff--slider__container__cart__content--main--tariff_price__container--currency">{currency}</p>
                                    </div>
                                    {discounted_price ? (
                                        <div className="section__tariff--slider__container__cart__content--main--tariff_price__container--discounted_price">
                                            <p className="section__tariff--slider__container__cart__content--main--tariff_price__container--discounted_price--value">{discounted_price}</p>
                                            <p className="section__tariff--slider__container__cart__content--main--tariff_price__container--discounted_price--currency">{currency}</p>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            {installment_plan ? (
                                <p className="section__tariff--slider__container__cart__content--main--installment_plan">{installment_plan}</p>
                            ) : (
                                <p className="section__tariff--slider__container__cart__content--main--installment_plan"></p>
                            )}
                        </div>
                        <div>
                            <div className="section__tariff--slider__container__cart__content--main--included_in_the_tariff">
                                <h4 className="section__tariff--slider__container__cart__content--main--included_in_the_tariff--h4">В тариф входит:</h4>
                                <ul className="section__tariff--slider__container__cart__content--main--included_in_the_tariff--ul">
                                    {included_in_the_tariff.map((item, i) => (
                                        <li className="section__tariff--slider__container__cart__content--main--included_in_the_tariff--ul__li" key={i}>
                                            <div className="section__tariff--slider__container__cart__content--main--included_in_the_tariff--ul__li--img">
                                                <img src={included_in_the_tariff_logo} alt="Галочка" />
                                            </div>
                                            <p className="section__tariff--slider__container__cart__content--main--included_in_the_tariff--ul__li--p">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {active_tariff ? (
                                <Link to="/nan">
                                    <Tariff_container_content_btn className="section__tariff--slider__container__cart__content--main--btn tariffBtnPersonalArea" title="Перейти в личный кабинет" >Перейти в личный кабинет</Tariff_container_content_btn>
                                </Link>
                            ) : (
                                <Link to="/nan">
                                    <Tariff_container_content_btn className="section__tariff--slider__container__cart__content--main--btn tariffBtndetails" title="Подробнее" >Подробнее</Tariff_container_content_btn>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </Tariff_container>
        );
    });

    return tariffsContent;
}
