export function navFunction(userLimitInfo, setUserLimitInfo) {    
    const numberОfUsed = document.querySelector('.nav__btn--user__info--container__limit--number__container--numberОfUsed');
    const valueTotal = document.querySelector('.nav__btn--user__info--container__limit--number__container--valueTotal');
    const userName = document.querySelector('.nav__btn--user__info--container__profile--text p');
    const userAvatar = document.querySelector('.nav__btn--user__info--container__profile--img img');
    
    setInterval(() => {
        const usedCompanyCount = sessionStorage.getItem('usedCompanyCount');
        const companyLimit = sessionStorage.getItem('companyLimit'); 

        if (usedCompanyCount !== "" && usedCompanyCount !== null && companyLimit !== "" && companyLimit !== null) {      
            numberОfUsed.textContent = usedCompanyCount;
            valueTotal.textContent = companyLimit;
        
            setUserLimitInfo(true);
        }
    }, 100);

    const userData = JSON.parse(localStorage.getItem('userData'));

    userName.textContent = userData[0].name;
    userAvatar.src = userData[0].avatar;
    userAvatar.alt = "Аватар пользователя " + userData[0].name;
}


