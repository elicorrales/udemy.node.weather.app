'use strict';

const downloader = require('image-downloader');
const path       = require('path');

const lat = 26;
const lng = -80;
const baseUrl = 'http://open.mapquestapi.com/staticmap/v5/map?';
const key     = 'key=KDAegN3LovvE3Cs6PEKUjGGnX27f6rFd';
const latlng  = '&center='+lat+','+lng;
const config  = '&scale=1&size=500,500&zoom=10';
const mapUrl  = baseUrl + key + latlng + config;

const mapImgPath = path.join(__dirname,'../public/img/maps','map.img.jpg');
console.log(mapImgPath);

const options = {
    url:mapUrl,
    dest:mapImgPath
}

downloader.image(options)
    .then(({filename,image}) => {
        console.log(filename);
    })
    .catch(
        error => {
            console.log(error);
        }
    );