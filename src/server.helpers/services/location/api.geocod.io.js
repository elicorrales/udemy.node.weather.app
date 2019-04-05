/* eslint-disable no-console */
'use strict';
const axios = require('axios');

const baseUrl = 'https://api.geocod.io';
const basePath = '/v1.3/geocode';
const key = '?api_key=5b7c11caaaf0bc7aacb702bf50b70facc1b4c57'

const onResolve = (result,httpres) => {
    const data = {};
    data.url = baseUrl;
    data.statusText = result.statusText;
    if (result.data && result.data.results) {
        data.latlng = result.data.results[0].location;
        data.address = result.data.results[0].formatted_address;
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
        httpres.status(error.response.status===422? 500 : error.response.status);//422 is unprocessable - something wrong with user adr input
        if (error.response.data && error.response.data.error) {
            data.message = error.response.data.error;
        } else {
            data.message = error.response.statusText;
        }
    }
    httpres.send(data);
};

const getGeolocation = (encodedAddress,httpres) => {
    const query = '&q='+encodedAddress;
    const url = baseUrl + basePath + key + query;
    axios.get(url)
        .then(result=>onResolve(result,httpres))
        .catch(error=>onReject(error,httpres));
};

module.exports = {
    getGeolocation
};

