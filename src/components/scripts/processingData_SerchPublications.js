import { processingData_GetUserLimit } from "./processingData_GetUserLimit";
import { processngData_GetIdPublications } from "./processngData_GetIdPublications";

export function processingData_SerchPublications(props) {
  const accessToken = localStorage.getItem("accessToken");

  sessionStorage.removeItem("summary");
  sessionStorage.removeItem("idPublications");
  sessionStorage.removeItem("news");

  fetch("https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      issueDateInterval: {
        startDate: props.startDate,
        endDate: props.endDate,
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              sparkId: null,
              entityId: null,
              inn: props.inn,
              maxFullness: props.checkbox.maxFullness,
              inBusinessNews: props.checkbox.inBusinessNews,
            },
          ],
          onlyMainRole: props.checkbox.onlyMainRole,
          tonality: props.tonality,
          onlyWithRiskFactors: false,
          riskFactors: {
            and: [],
            or: [],
            not: [],
          },
          themes: {
            and: [],
            or: [],
            not: [],
          },
        },
        themesFilter: {
          and: [],
          or: [],
          not: [],
        },
      },
      searchArea: {
        includedSources: [],
        excludedSources: [],
        includedSourceGroups: [],
        excludedSourceGroups: [],
      },
      attributeFilters: {
        excludeTechNews: true,
        excludeAnnouncements: true,
        excludeDigests: true,
      },
      similarMode: "duplicates",
      limit: 1000,
      sortType: "sourceInfluence",
      sortDirectionType: "desc",
      intervalType: "month",
      histogramTypes: ["totalDocuments", "riskFactors"],
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      if (data.data.length > 0) {
        let summary = [];
        for (let i = 0; i < data.data[0].data.length; i++) {
          let documents = {
            date:
              data.data[0].data[i].date.slice(8, 10) +
              "." +
              data.data[0].data[i].date.slice(5, 7) +
              "." +
              data.data[0].data[i].date.slice(0, 4),
            total: data.data[0].data[i].value,
            risk: data.data[1].data[i].value,
          };

          summary.push(documents);
        }

        sessionStorage.setItem("summary", JSON.stringify(summary));
        processingData_GetUserLimit();
        processngData_GetIdPublications(props);
      } else {
        console.log("Нечего не найдено");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
