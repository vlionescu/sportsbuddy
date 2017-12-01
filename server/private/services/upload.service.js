/* jshint node: true */
/*jshint esversion: 6 */
"use strict";

const multer = require('multer');
const acceptedExtensions = ['pdf', 'doc', 'docx', 'xlsx', 'xls', 'txt', 'jpg', 'jpeg', 'svg', 'gif', 'png', '.exe'];

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = 'temp/';
        cb(null, path);
    },
    filename: function (req, file, cb) {
        req.headers['x-photo'] = file.originalname;
        cb(null, file.originalname);
    }
});

let upload = multer({
    storage,
    limits: {fileSize: 1000000},
    fileFilter: function (req, file, cb) {

        let filename = file.originalname.split('.');
        let ext = filename[filename.length - 1];

        if (!acceptedExtensions.includes(ext)) {
            return cb({code: 'FILE_TYPE_NOT_SUPPORTED'});
        }

        cb(null, true)
    }
}).single('image');


module.exports = {upload};
