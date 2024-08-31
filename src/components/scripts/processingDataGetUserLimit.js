import { makeApiRequest } from "./makeApiRequestFunction";

export async function processingDataGetUserLimit() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const payload = {};
    const method = "GET";
    const url = "https://gateway.scan-interfax.ru/api/v1/account/info";

    try {
      const response = await makeApiRequest({ method, payload, url });

      sessionStorage.setItem(
        "companyLimit",
        response.eventFiltersInfo.companyLimit
      );
      sessionStorage.setItem(
        "usedCompanyCount",
        response.eventFiltersInfo.usedCompanyCount
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
