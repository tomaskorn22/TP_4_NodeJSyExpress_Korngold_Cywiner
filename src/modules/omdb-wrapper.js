import axios from "axios";

const APIKEY = "20b52706"; 
const BASE_URL = "http://www.omdbapi.com/";

const OMDBSearchByPage = async (searchText, page = 1) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: APIKEY,
                s: searchText,
                page: page
            }
        });

        if (response.data.Response === "True") {
            returnObject.respuesta = true;
            returnObject.cantidadTotal = parseInt(response.data.totalResults);
            returnObject.datos = response.data.Search;
        }
    } catch (error) {
        console.error("Error en OMDBSearchByPage:", error);
    }

    return returnObject;
};

const OMDBSearchComplete = async (searchText) => {
    let allResults = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        let result = await OMDBSearchByPage(searchText, page);
        if (result.respuesta) {
            allResults = allResults.concat(result.datos);
            page++;
            hasMore = allResults.length < result.cantidadTotal;
        } else {
            hasMore = false;
        }
    }

    return {
        respuesta: allResults.length > 0,
        cantidadTotal: allResults.length,
        datos: allResults
    };
};

const OMDBGetByImdbID = async (imdbID) => {
    let returnObject = {
        respuesta: false,
        datos: {}
    };

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: APIKEY,
                i: imdbID
            }
        });

        if (response.data.Response === "True") {
            returnObject.respuesta = true;
            returnObject.datos = response.data;
        }
    } catch (error) {
        console.error("Error en OMDBGetByImdbID:", error);
    }

    return returnObject;
};

export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };