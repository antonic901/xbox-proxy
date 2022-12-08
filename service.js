const axios = require("axios");
const fs = require("fs");

function createConfig(type, url, headers, query, body) {
    // Figure out why this is making a problem (socket hang_up)
    delete headers["content-length"];

    let config = {
        method: type,
        url: url,
        headers: headers,
        params: query,
    };
    if (type !== "get") {
        config.data = body;
    }
    return config;
}

async function makeRequest(type, url, headers, query, body) {
    let config = createConfig(type, url, headers, query, body);
    log(`Making a new request with following config:\n${JSON.stringify(config)}`);
    try {
        let response = await axios(config);
        log("Succesfully make connection. Sending back response");
        return {
            success: true,
            status: response.status,
            body: response.data,
        };
    } catch (err) {
        if (err.response) {
            log(
                `API returned error: ${err.response.status}\n${JSON.stringify(
                    err.response.data
                )}`
            );
            return {
                success: false,
                status: err.response.status,
                body: err.response.data,
            };
        }
        log(`Internal server error:\n${JSON.stringify(err)}`);
        return {
            success: false,
            status: 500,
            body: err,
        };
    }
}

function log(content) {
    fs.appendFile("xbox-proxy.log", `${content}\n`, (err) => {
        if (err) {
            console.error(err);
        }
        // done!
    });
}

module.exports = { makeRequest };
