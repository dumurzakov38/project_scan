import icon_plan_beginner_scan from "../../img/icon_plan_beginner_scan.svg";
import icon_plan_pro_scan from "../../img/icon_plan_pro_scan.svg";
import icon_plan_business_scan from "../../img/icon_plan_business_scan.svg";
import icon_plan_checkmark_scan from "../../img/icon_plan_checkmark_scan.svg";
import avatar_scan from "../../img/avatar_scan.jpg";

export function userInfo() {
    const userAuthorized = localStorage.getItem('accessToken');
    let active_tariffValue = 0;

    if (userAuthorized !== "" && userAuthorized !== null) {
        active_tariffValue = 1;
    }

    const tariffs = [
        {
            tariff_header:  {
                tariff_name: 'Beginner',
                for_whom_tariff: 'Для небольшого исследования',
                tariff_logo: icon_plan_beginner_scan,
                tariff_logo_alt: 'Логотип тарифа - Beginner',
                color_header: '#FFB64F',
                color_text: '#000'
            },
            tariff_price: {
                price: 799,
                discounted_price: 1200,
                installment_plan: 'или 150 ₽/мес. при рассрочке на 24 мес.',
                currency: 'Р'
            },
            included_in_the_tariff: [
                'Безлимитная история запросов',
                'Безопасная сделка',
                'Поддержка 24/7'
            ],
            included_in_the_tariff_logo: icon_plan_checkmark_scan,
            active_tariff: active_tariffValue
        },
        {
            tariff_header:  {
                tariff_name: 'Pro',
                for_whom_tariff: 'Для HR и фрилансеров',
                tariff_logo: icon_plan_pro_scan,
                tariff_logo_alt: 'Логотип тарифа - Pro',
                color_header: '#7CE3E1',
                color_text: '#000'
            },
            tariff_price: {
                price: 1299,
                discounted_price: 2600,
                installment_plan: 'или 279 ₽/мес. при рассрочке на 24 мес.',
                currency: 'Р'
            },
            included_in_the_tariff: [
                'Все пункты тарифа Beginn',
                'Экспорт истории',
                'Рекомендации по приоритет'
            ],
            included_in_the_tariff_logo: icon_plan_checkmark_scan,
            active_tariff: 0
        },
        {
            tariff_header:  {
                tariff_name: 'Business',
                for_whom_tariff: 'Для корпоративных клиентов',
                tariff_logo: icon_plan_business_scan,
                tariff_logo_alt: 'Логотип тарифа - Business',
                color_header: '#000000',
                color_text: '#FFF'
            },
            tariff_price: {
                price: 2379,
                discounted_price: 3700,
                installment_plan: '',
                currency: 'Р'
            },
            included_in_the_tariff: [
                'Все пункты тарифа Pro',
                'Безлимитное количество запросов',
                'Приоритетная поддержка'
            ],
            included_in_the_tariff_logo: icon_plan_checkmark_scan,
            active_tariff: 0
        }
    ];

    const userData = [
        {
            name: 'Алексей А.',
            avatar: avatar_scan
        }
    ];

    
    localStorage.setItem('tariff', JSON.stringify(tariffs));
    localStorage.setItem('userData', JSON.stringify(userData));
}