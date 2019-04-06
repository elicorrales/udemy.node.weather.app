/* eslint-disable no-console */
'use strict';

const weather = (weather,httpreq,httpres) => {
    if (httpreq.query !== '') {
        if (httpreq.query.lat && httpreq.query.lng) {
            console.log('\nweather helper getting weather....');
            weather.getWeather(httpreq.query.lat,httpreq.query.lng,httpres);
        } else {
            let error = { message: 'Missing lat lng'};
            httpres.status(400);
            httpres.send(error);
        }
    }
};

module.exports = {
    weather
}