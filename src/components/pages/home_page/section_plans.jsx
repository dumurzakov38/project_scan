import React from "react";
import { Card_tariff } from "./components/card_tariff";

export function Section_plans(params) {
  const tariffData = JSON.parse(localStorage.getItem("tariff"));
  let tariffs = [];

  for (let i = 0; i < tariffData.length; i++) {
    const tariff = {
      tariff_header: {
        tariff_name: tariffData[i].tariff_header.tariff_name,
        for_whom_tariff: tariffData[i].tariff_header.for_whom_tariff,
        tariff_logo: tariffData[i].tariff_header.tariff_logo,
        tariff_logo_alt: tariffData[i].tariff_header.tariff_logo_alt,
        color_header: tariffData[i].tariff_header.color_header,
        color_text: tariffData[i].tariff_header.color_text,
      },
      tariff_price: {
        price: tariffData[i].tariff_price.price,
        discounted_price: tariffData[i].tariff_price.discounted_price,
        installment_plan: tariffData[i].tariff_price.installment_plan,
        currency: tariffData[i].tariff_price.currency,
      },
      included_in_the_tariff: [
        tariffData[i].included_in_the_tariff[0],
        tariffData[i].included_in_the_tariff[1],
        tariffData[i].included_in_the_tariff[2],
      ],
      included_in_the_tariff_logo: tariffData[i].included_in_the_tariff_logo,
      active_tariff: tariffData[i].active_tariff,
    };

    tariffs.push(tariff);
  }

  return (
    <section className="content section__tariff">
      <div className="section__tariff--h1">
        <h1>наши тарифы</h1>
      </div>
      <div className="section__tariff--slider">
        <div className="section__tariff--slider__container">
          <Card_tariff props={tariffs} />
        </div>
      </div>
    </section>
  );
}
