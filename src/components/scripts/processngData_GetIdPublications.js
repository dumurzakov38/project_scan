import { processingData_GetPublications } from "./processingData_GetPublications";

export function processngData_GetIdPublications(props) {
  const accessToken = localStorage.getItem("accessToken");

  fetch("https://gateway.scan-interfax.ru/api/v1/objectsearch", {
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
      sessionStorage.setItem("idPublications", JSON.stringify(data.items));

      processingData_GetPublications();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
