import { processingData_GetUserLimit } from "./processingData_GetUserLimit";

export function processingData_Authorization(props) {
  let { loginNumber, password } = props;

  let data = {
    login: loginNumber,
    password: password,
  };

  fetch("https://gateway.scan-interfax.ru/api/v1/account/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("expire", data.expire);

      processingData_GetUserLimit();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
