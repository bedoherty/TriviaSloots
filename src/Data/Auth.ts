import createAuth0Client from "@auth0/auth0-spa-js";

export const auth0Client = createAuth0Client({
    domain: "bedoherty.auth0.com",
    client_id: "yXxvDsbQ1cjWJbbLCi657xVed1gFSgr7",
    redirect_uri: window.location.origin + "/auth",
    audience: "https://triviasloots.com"
});