/* eslint-disable no-console */
'use strict';

const location = (geoloc,httpreq,httpres) => {
    if (httpreq.query !== '') {
        if (httpreq.query.address && httpreq.query.address.length > 2) {
            geoloc.getGeolocation(encodeURIComponent(httpreq.query.address),httpres);
        } else {
            let error = { message: 'Missing Address Or Too Short' };
            //httpres.statusCode = 500;
            httpres.status(500);
            httpres.send(error);
        }
    }
};

module.exports = {
    location
}