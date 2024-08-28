export function processingData_GetUserLimit() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    fetch("https://gateway.scan-interfax.ru/api/v1/account/info", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem(
          "companyLimit",
          data.eventFiltersInfo.companyLimit
        );
        sessionStorage.setItem(
          "usedCompanyCount",
          data.eventFiltersInfo.usedCompanyCount
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
