import { processingData_GetUserLimit } from "./processingData_GetUserLimit";
import { userInfo } from "../scripts/userInfo";

export function processingData_Authorization(userData, navigate) {
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
        if (response.status !== "") {
          return { errorCode: response.status };
        }
        throw new Error("Ошибка сети: " + response);
      }
      return response.json();
    })
    .then((data) => {
      if (data.errorCode) {
        return data;
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("expire", data.expire);

      userInfo();

      navigate("/");
      processingData_GetUserLimit();
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
