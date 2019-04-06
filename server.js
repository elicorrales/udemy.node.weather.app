/* eslint-disable no-console */
'use strict';

const express = require('express');
const hbs     = require('hbs');
const path    = require('path');

const location = require('./src/server.helpers/server.location');
const geoloc1  = require('./src/server.helpers/services/location/api.geocod.io');
const geoloc2  = require('./src/server.helpers/services/location/api.opencagedata.com');

const weather  = require('./src/server.helpers/server.weather');
const weather1 = require('./src/server.helpers/services/weather/api.darksky.net');
const weather2 = require('./src/server.helpers/services/weather/api.openweathermap.org');

const map      = require('./src/server.helpers/services/map/open.mapquestapi.com');

const viewToRender = require('./src/server.helpers/server.viewToRender');

const port = 8080;
const host = 'localhost';
const server = express();

const staticAssests = path.join(__dirname,'/public');
const viewsPath     = path.join(__dirname,'/src/templates/views');
const partialsPath  = path.join(__dirname,'/src/templates/partials');
server.use(express.static(staticAssests));
server.set('view engine','hbs');
server.set('views',viewsPath);
hbs.registerPartials(partialsPath);
hbs.registerHelper('currentYear',() => { return new Date().getFullYear(); });


server.get('/favicon.ico', (req, res) => {
    res.status(204);
});

server.get('/',(req,res) => {
    console.log('You requested ' + req.path);
    viewToRender.renderHome(req,res);
});

server.get('/about',(req,res) => {
    console.log('You requested ' + req.path);
    viewToRender.renderAbout(req,res);
});

server.get('/help',(req,res) => {
    console.log('You requested ' + req.path);
    viewToRender.renderHelp(req,res);
});

server.get('/location', (req, res) => {
     //res.send('you need either /location/1 or /location/2');
    viewToRender.renderLocation(req,res);
});
server.get('/location/1', (req, res) => {
    console.log('You requested ' + req.path);
    location.location(geoloc1,req,res);
});
server.get('/location/2', (req, res) => {
    console.log('You requested ' + req.path);
    location.location(geoloc2,req,res);
});

server.get('/weather', (req, res) => { res.send('you need either /weather/1 or /weather/2'); });
server.get('/weather/1', (req, res) => {
    console.log('You requested ' + req.path);
    weather.weather(weather1,req,res);
});
server.get('/weather/2', (req, res) => {
    console.log('You requested ' + req.path);
    weather.weather(weather2,req,res);
});

server.get('/map', (req,res) => {
    console.log('You requested ' + req.path + ', query = ' + JSON.stringify(req.query));
    map.getMap(req,res);
});

server.get('*', (req, res) => {
    console.log('Redirect - You requested ' + req.path);
    res.redirect('/');
});

server.listen(port,host,1,() => {
    console.log('weather-server is UP');
});