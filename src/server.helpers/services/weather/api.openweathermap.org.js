/* eslint-disable no-console */
'use strict';
const axios = require('axios');

const getWeather = (lat,lng,httpres) => {

    const baseUrl = 'https://api.openweathermap.org';
    const basePath = '/data/2.5/weather?';
    const key = '&appid=74b60ebdff399e2b337af26c9245948a';
    const query = 'lat='+lat + '&lon=' + lng + '&units=imperial';
    const url = baseUrl + basePath + query + key;
    console.log(url);

    axios.get(url)
        .then(response => {
            //console.log(response.data.main.temp);
            //console.log(response.data.weather[0].main);
            const data = {
                url:baseUrl,
                weather:response.data.weather[0].main,
                temp:response.data.main.temp
            }
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

