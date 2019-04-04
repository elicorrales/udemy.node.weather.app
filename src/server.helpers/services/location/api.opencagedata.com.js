/* eslint-disable no-console */
'use strict';
const axios = require('axios');

const getGeolocation = (address) => {
    const encodedAddress = encodeURIComponent(address);

    // geocod.io gelocation
    const base = 'https://api.opencagedata.com/geocode/v1/json?';
    const key = '&key=bb823af9d2c3422a8019ac9c927f61f1';
    //const query = 'q=PLACENAME&'+encodedAddress;
    const query = 'q='+encodedAddress;
    const url = base + query + key;

    return new Promise((resolve,reject) => {
        axios.get(url)
            .then(response => {
                let results = {
                    url,
                    address:response.data.results[0].formatted,
                    location:response.data.results[0].geometry,
                    mapUrl:response.data.results[0].annotations.OSM.url
                }
                resolve(results);
            }) .catch(error => {
                let errMsg = { 'error' : ''+error};
                reject(errMsg);
            });

    })
};

module.exports = {
    getGeolocation
};

