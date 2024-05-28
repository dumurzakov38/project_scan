import React, { useState, useEffect } from "react";
import { addSpacesToNumber } from "./addSpacesToNumber";

export function NumberOfOptions() {
    const [numberOfOptions, setNumberOfOptions] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const data = sessionStorage.getItem('summary');

            if (data) {
                const summary = JSON.parse(data);
                setNumberOfOptions(summary.length);
            } else {
                setNumberOfOptions(0);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const ending2 = (number) => {
        if (number === 1) {
            return "вариант";
        } else if (number >= 2 && number <= 4) {
            return "варианта";
        } else {
            return "вариантов";
        }
    };

    const ending1 = (number) => {
        if (number === 1) {
            return "Найден";
        } else {
            return "Найдено";
        }
    };

    return (
        <p className="result__container__content--summary__container--p">
            {ending1(numberOfOptions)} {addSpacesToNumber(numberOfOptions)} {ending2(numberOfOptions)}
        </p>
    );
}
