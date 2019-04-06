/* eslint-disable no-console */
'use strict';
const axios = require('axios');

const getWeather = (lat,lng,httpres) => {

    const base = 'https://api.openweathermap.org/data/2.5/weather?';
    const key = '&appid=74b60ebdff399e2b337af26c9245948a';
    const query = 'lat='+lat + '&lon=' + lng;
    const url = base + query + key;
    console.log(url);

    axios.get(url)
        .then(response => {
            //console.log(response.data.main.temp);
            //console.log(response.data.weather[0].main);
            const data = {
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

