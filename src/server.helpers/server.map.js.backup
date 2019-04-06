/* eslint-disable no-console */
'use strict';
const fs = require('fs');
const path = require('path');


const map = (map,req,res) => {


    if (req.query !== '') {
        if (req.query.lat && req.query.lng) {
            map.getMap(req.query.lat,req.query.lng)
                .then(result => {
                    const imgPath = path.resolve(__dirname,'/public/img/maps','map.jpg');
                    const writer  = fs.createWriteStream(imgPath);
                    result.data.pipe(writer);
                    console.log(result);
                    res.resolve('done');
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
            let error = { msg: 'Missing Address Or Too Short' };
            res.send(error);
        }
    } else {
        let error = { msg: 'Missing Query' };
        res.send(error);
    }
};

module.exports = {
    map
}