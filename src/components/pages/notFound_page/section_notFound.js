import React, { useEffect } from "react";
import bg_section_notFound from "../../../img/bg_section_notFound.svg";

export function Section_notFound(params) {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <main className="first_section">
            <section className="content">
                <div className="notFound__container">
                    <h1 className="notFound__container--h1">Not Found | Страница не найдена</h1>
                    <div className="notFound__container--containerImg">
                        <img className="notFound__container--containerImg__img" src={bg_section_notFound}/>
                    </div>
                </div>
            </section>
        </main>
    );
}