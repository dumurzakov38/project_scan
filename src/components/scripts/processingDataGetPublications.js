import { makeApiRequest } from "./makeApiRequestFunction";

let firstId = 0;
let lastId = 10;

export async function processingDataGetPublications(props) {
  if (props === "lazy") {
    firstId += 10;
    lastId += 10;
  }

  const idPublications = JSON.parse(sessionStorage.getItem("idPublications"));
  const slicedData = idPublications.slice(firstId, lastId);

  const encodedIds = slicedData.map((item) => item.encodedId);

  const payload = {
    ids: encodedIds,
  };

  const method = "POST";
  const url = "https://gateway.scan-interfax.ru/api/v1/documents";

  try {
    const response = await makeApiRequest({ method, payload, url });

    let news = sessionStorage.getItem("news");

    if (!news) {
      sessionStorage.setItem("news", JSON.stringify(response));
    } else {
      news = JSON.parse(news);
      news.push(...response);
      sessionStorage.setItem("news", JSON.stringify(news));
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
