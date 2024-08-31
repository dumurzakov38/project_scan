import { makeApiRequest } from "./makeApiRequestFunction";
import { processingDataGetUserLimit } from "./processingDataGetUserLimit";
import { processngDataGetIdPublications } from "./processngDataGetIdPublications";

export async function processingDataSerchPublications(props) {
  sessionStorage.removeItem("summary");
  sessionStorage.removeItem("idPublications");
  sessionStorage.removeItem("news");

  const payload = {
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
  };

  const method = "POST";
  const url = "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms";

  try {
    const response = await makeApiRequest({ method, payload, url });

    if (response.data.length > 0) {
      let summary = [];
      for (let i = 0; i < response.data[0].data.length; i++) {
        let documents = {
          date:
            response.data[0].data[i].date.slice(8, 10) +
            "." +
            response.data[0].data[i].date.slice(5, 7) +
            "." +
            response.data[0].data[i].date.slice(0, 4),
          total: response.data[0].data[i].value,
          risk: response.data[1].data[i].value,
        };

        summary.push(documents);
      }

      sessionStorage.setItem("summary", JSON.stringify(summary));
      processingDataGetUserLimit();
      processngDataGetIdPublications(props);
    } else {
      console.log("Нечего не найдено");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
