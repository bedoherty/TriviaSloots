import { getActiveToken } from "../Selectors/User";
import { store } from "../Redux";

const urlBase = (() => {
    switch (window.location.origin) {
        case "http://localhost:3000":
            return "http://localhost:3069/";
        default:
            return "https://api.triviasloots.com";
    }
})();

type UrlQuery = {
    [key: string]: string | number
}

const encodeUrlQuery = (query: UrlQuery) => {
    let queryPart = "?";
    return queryPart += 
        Object
        .keys(query).map((key: string) => {
            return `${ key }=${ encodeURIComponent(query[key]) }`;
        })
        .join("&");
}

export const GET = (location: string, query?: UrlQuery) => {
    let url = urlBase;

    if (location && location.length) {
        url += location;
    }

    if (query && Object.keys(query).length >= 1) {
        url += encodeUrlQuery(query);
    }

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "get",
            headers: {
                Authorization: "Bearer " + getActiveToken(store.getState())
            } 
        })
        .then(res => res.json())
        .then(resolve)
        .catch(reject);
    });
}