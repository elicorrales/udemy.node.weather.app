/* eslint-disable no-console */
'use strict';
const axios = require('axios');

const getGeolocation = (address) => {
    const encodedAddress = encodeURIComponent(address);

    // geocod.io gelocation
    const base = 'https://api.geocod.io/v1.3/geocode';
    const key = '?api_key=5b7c11caaaf0bc7aacb702bf50b70facc1b4c57'
    const query = '&q='+encodedAddress;
    const url = base + key + query;

    return new Promise((resolve,reject) => {
        axios.get(url)
            .then(response => {
                if (response.data.results[0]) {
                    let results = {
                        url,
                        address:response.data.results[0].formatted_address,
                        location:response.data.results[0].location
                    }
                    resolve(results);
                } else {
                    let errMsg = { 'error' : 'Not Enough Address'};
                    reject(errMsg);
                }

                let errMsg = {
                    url,
                    'error':response
                };
                reject(errMsg);
            }) .catch(error => {
                let errMsg = { url,'error' : ''+error};
                reject(errMsg);
            });

    })
};

module.exports = {
    getGeolocation
};

