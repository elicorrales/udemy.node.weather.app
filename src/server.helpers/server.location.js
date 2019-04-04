/* eslint-disable no-console */
'use strict';

const location = (geoloc,req,res) => {
    if (req.query !== '') {
        if (req.query.address && req.query.address.length > 2) {
            geoloc.getGeolocation(req.query.address)
                .then(result => {
                    res.send(result);
                })
                .catch(error => {
                    if (error.response) {
                        res.send(error.response.status + ' ' + error.response.statusText);
                    } else {
                        res.send(error);
                    }
                });
        } else {
            let error = {
                msg: 'Missing Address Or Too Short'
            };
            res.send(error);
        }
    }
};

module.exports = {
    location
}