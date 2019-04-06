/* eslint-disable no-console */
'use strict';
const axios = require('axios');

const baseUrl = 'https://api.opencagedata.com';
const basePath = '/geocode/v1/json?';
const key = '&key=bb823af9d2c3422a8019ac9c927f61f1';

const onResolve = (result,httpres) => {
    const data = {};
    data.url = baseUrl;
    data.statusText = result.statusText;
    if (result.data && result.data.results && result.data.results.length > 0) {
        data.latlng = result.data.results[0].geometry;
        data.address = result.data.results[0].formatted;
    } else {
        httpres.status(400);
        data.message = 'No Address Result';
    }
    httpres.send(data);
};

const onReject = (error,httpres) => {
    let data = {
        url:baseUrl,
        errno:error.errno,
        host:error.host
    };
    if (error.response) {
        httpres.status(error.response.status);
        data.message = error.response.statusText;
    } else if(error.message) {
        httpres.status(500);
        data.message = error.message;
    }
    httpres.send(data);
};

const getGeolocation = (encodedAddress,httpres) => {
    const query = 'q='+encodedAddress;
    const url = baseUrl + basePath + query + key;
    axios.get(url)
        .then(result=>onResolve(result,httpres))
        .catch(error=>onReject(error,httpres));
};

module.exports = {
    getGeolocation
};

