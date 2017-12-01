/*jshint node: true*/
/*jshint esversion: 6 */

"use strict";

const fs = require('fs');

async function copyPhoto(photoSource, photoDest) {

    return fs.copyFile(photoSource, photoDest, await function(err) {
        if (err) throw err;
        console.log('The data was copied.');
    });
}

async function deletePhoto(photoPath) {
    return fs.unlinkSync(photoPath, await function(err) {
        if (err) throw err;
        console.log('The data was deleted.');
    });
}

module.exports = {copyPhoto, deletePhoto};