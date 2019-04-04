/* eslint-disable no-console */
'use strict';

const renderHome = (req,res) => {
    res.render('home', {
        title:'Today\'s Weather',
        message:'Get Your Weather Here',
        name: 'Eli'
    });
};

const renderAbout = (req,res) => {
    res.render('about', {
        title:'About Weather App',
        message:'This Weather App Is A Project I started With Udemy',
        createdBy:'Created By',
        name:'Eli'
    });
};

const renderHelp = (req,res) => {
    res.render('help', {
        title:'Help - Weather App',
        message:'General Help',
        name:'Eli'
    });
};

const renderLocation = (req,res) => {
    res.render('location', {
        title:'Location - Weather App',
        message:'Location Services',
        name:'Eli'
    });
};


module.exports = {
    renderHome,
    renderLocation,
    renderAbout,
    renderHelp
}