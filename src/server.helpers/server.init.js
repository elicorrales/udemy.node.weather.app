/* eslint-disable no-console */
'use strict';
const fse = require('fs-extra');
const path = require('path');


const cleanMapImgDir = () => {

    const mapImgPath = path.resolve('public/img/maps');
    fse.emptyDirSync(mapImgPath);

};

module.exports = {
    cleanMapImgDir
}