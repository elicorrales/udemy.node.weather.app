/* eslint-disable no-console */
'use strict';
const axios = require('axios');

const getWeather = (lat,lng) => {

    const base = 'https://api.darksky.net/forecast/';
    const key = 'd2ba1cee5a6db07ff016e20b261fa403/';
    const query = lat + ',' + lng;
    const url = base + key + query;

    return new Promise((resolve,reject) => {
        axios.get(url)
            .then(response => {
                //console.log(response);
                console.log(response.data.currently);
                //console.log('geolocation : ' + response.data.input.formatted_address);
                //console.log('');
                //console.log('geolocation : ');
                //console.log(response.data.results[0].location);
                //console.log('');
                //resolve(response.data.results[0].location);
                resolve(response.data.currently);
            }) .catch(error => {
                console.log('weather : ' + error);
                let errMsg = { 'error' : ''+error};
                reject(errMsg);
            });

    })
};

module.exports = {
    getWeather
};

