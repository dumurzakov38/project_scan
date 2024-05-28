import React from "react";

import { Slider_whyus } from "./components/slider_whyus";
import time_icon_scan from "../../../img/time_icon_scan.png";
import serch_icon_scan from "../../../img/serch_icon_scan.png";
import security_icon_scan from "../../../img/security_icon_scan.png";
import bg_section_whyus from "../../../img/bg_section_whyus.svg";

export function Section_whyUs(params) {
    const Content_slider_whyus = [
        {
            img: time_icon_scan,
            img_alt: "Иконка блока",
            p: "Высокая и оперативная скорость обработки заявки"
        },{
            img: serch_icon_scan,
            img_alt: "Иконка блока",
            p: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
        },{
            img: security_icon_scan,
            img_alt: "Иконка блока",
            p: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
        },{
            img: serch_icon_scan,
            img_alt: "Иконка блока",
            p: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
        },{
            img: security_icon_scan,
            img_alt: "Иконка блока",
            p: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
        },{
            img: serch_icon_scan,
            img_alt: "Иконка блока",
            p: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
        },{
            img: security_icon_scan,
            img_alt: "Иконка блока",
            p: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
        },{
            img: serch_icon_scan,
            img_alt: "Иконка блока",
            p: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
        },{
            img: security_icon_scan,
            img_alt: "Иконка блока",
            p: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
        }
    ]

    return (
        <section className="content section_whyus">
            <div className="section_whyus--h1">
                <h1>Почему именно мы</h1>
            </div>
            <div className="section_whyus--slider">
                <Slider_whyus data={Content_slider_whyus} />
            </div>
            <div className="section_whyus--bg">
                <img className="" src={bg_section_whyus} alt="Фон блока Почему именно мы" />
            </div>
        </section>
    );
}