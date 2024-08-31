import { makeApiRequest } from "./makeApiRequestFunction";
import { processingDataGetPublications } from "./processingDataGetPublications";

export async function processngDataGetIdPublications(props) {
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
    limit: props.limit,
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "month",
    histogramTypes: ["totalDocuments", "riskFactors"],
  };

  const method = "POST";
  const url = "https://gateway.scan-interfax.ru/api/v1/objectsearch";

  try {
    const response = await makeApiRequest({ method, payload, url });

    sessionStorage.setItem("idPublications", JSON.stringify(response.items));

    processingDataGetPublications();
  } catch (error) {
    console.error("Error:", error);
  }
}
