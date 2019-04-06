/* eslint-disable no-console */
'use strict';
const axios = require('axios');

const getWeather = (lat,lng,httpres) => {

    const baseUrl = 'https://api.darksky.net';
    const basePath = '/forecast/';
    const key = 'd2ba1cee5a6db07ff016e20b261fa403/';
    const query = lat + ',' + lng;
    const url = baseUrl + basePath + key + query;
    console.log(url);

    axios.get(url)
        .then(response => {
            //console.log(response);
            const data = {
                url:baseUrl,
                weather:response.data.currently.summary,
                temp:response.data.currently.temperature
            };
            httpres.send(data);
        })
        .catch(error => {
            console.log('weather : ' + error);
            let errMsg = { 'error' : ''+error};
            httpres.send(errMsg);
        });
};

module.exports = {
    getWeather
};

