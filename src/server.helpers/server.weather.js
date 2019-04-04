/* eslint-disable no-console */
'use strict';

const weather = (weather,req,res) => {
    if (req.query !== '') {
        if (req.query.lat && req.query.lng) {
            weather.getWeather(req.query.lat,req.query.lng)
                .then(result => {
                    console.log('server : ' + JSON.stringify(result));
                    let currently = JSON.stringify(result);
                    let msg = 'You requested /weather ' + JSON.stringify(req.query) + '<br/>\n';
                    res.send(msg + 'Weather is: ' + currently);
                    //res.send(msg + 'Weather is: ');
                })
                .catch(error => {
                    console.log('server : ');
                    console.log(error);
                    if (error.response) {
                        //console.log('server : ' + error);
                        //console.log(error.response);
                        console.log(error.response.status);
                        console.log(error.response.statusText);
                        res.send(error.response.status + ' ' + error.response.statusText);
                    } else {
                        console.log(error);
                        res.send(error);
                    }
                });
        } else {
            res.send('Missing lat lng');
        }
    }
};

module.exports = {
    weather
}