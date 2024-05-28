import React from "react";
import { getYears } from "./components/getYears";
import logo_scan from "../../img/logo_scan_white.svg";

export function Footer(params) {
    return (
        <footer>
            <div className="footer_container content">
                <div className="footer_container--logo">
                    <img className="footer_container--logo logo_scan_img" src={logo_scan} alt="Логотип сервиса 'Скан'" />
                </div>
                <div className="footer_container--text">
                    <div className="footer_container--text_container">
                        <p className="footer_container--text_container--p">г. Москва, Цветной б-р, 40 <br/>+7 495 771 21 11 <br/>info@skan.ru</p>
                    </div>
                    <p className="footer_container--text_p">Copyright. {getYears()}</p>
                </div>
            </div>
        </footer>
    );
}