export function navFunction(
  setUserLimitInfo,
  numberОfUsedRef,
  valueTotalRef,
  userNameRef,
  userAvatarRef
) {
  const numberОfUsed = numberОfUsedRef.current;
  const valueTotal = valueTotalRef.current;
  const userName = userNameRef.current;
  const userAvatar = userAvatarRef.current;

  setInterval(() => {
    const usedCompanyCount = sessionStorage.getItem("usedCompanyCount");
    const companyLimit = sessionStorage.getItem("companyLimit");

    if (
      usedCompanyCount !== "" &&
      usedCompanyCount !== null &&
      companyLimit !== "" &&
      companyLimit !== null
    ) {
      numberОfUsed.textContent = usedCompanyCount;
      valueTotal.textContent = companyLimit;

      setUserLimitInfo(true);
    }
  }, 100);

  const userData = JSON.parse(localStorage.getItem("userData"));

  userName.textContent = userData[0].name;
  userAvatar.src = userData[0].avatar;
  userAvatar.alt = "Аватар пользователя " + userData[0].name;
}
