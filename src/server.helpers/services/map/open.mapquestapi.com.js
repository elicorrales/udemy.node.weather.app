/* eslint-disable no-console */
'use strict';
const download = require('image-downloader');
const path     = require('path');

const getMap = (req,res) => {
    if (req.query.lat && req.query.lng) {
        const baseUrl = 'http://open.mapquestapi.com/staticmap/v5/map?';
        const key     = 'key=KDAegN3LovvE3Cs6PEKUjGGnX27f6rFd';
        const latlng  = '&center='+req.query.lat+','+req.query.lng;
        const config  = '&scale=1&size=300,300&zoom=7';
        const mapUrl  = baseUrl + key + latlng + config;
        const date    = new Date();
        const time    = date.getHours()+'.'+date.getMinutes()+'.'+date.getSeconds()+'.'+date.getMilliseconds();
        const filename  = 'map.img.'+time+'.jpg';
        const mapImgPath = path.resolve('public/img/maps',filename);

        let downloadOptions = {
            url: mapUrl,
            dest: mapImgPath
        };
        download.image(downloadOptions)
            .then(({filepath,image}) => {
                res.send({filename});
            }) .catch(error => {
                let errMsg = { 'error' : ''+error};
                res.send(errMsg);
            });

    } else {
        res.send('no map query params');
    }
};

module.exports = {
    getMap
};

