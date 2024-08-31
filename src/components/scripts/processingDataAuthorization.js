import { processingDataGetUserLimit } from "./processingDataGetUserLimit";
import { userInfo } from "./userInfo";

export function processingDataAuthorization({
  userData,
  navigate,
  setUserIsAuthorized,
  dispatch,
  setMessage,
  clearMessage,
}) {
  let { loginNumber, password } = userData;

  let data = {
    login: loginNumber,
    password: password,
  };

  return fetch("https://gateway.scan-interfax.ru/api/v1/account/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          dispatch(setMessage(errorData.message));
          return { errorCode: response.status };
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.errorCode) {
        return { errorCode: data.errorCode };
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("expire", data.expire);

      userInfo();

      setUserIsAuthorized(true);
      dispatch(clearMessage(""));
      navigate("/");
      processingDataGetUserLimit();
      return { success: true };
    })
    .catch((error) => {
      console.error("Error:", error);
      return {
        errorCode: 500,
        errorMessage: "Ошибка сервера. Попробуйте позже.",
      };
    });
}
