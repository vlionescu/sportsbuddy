/*jshint node: true*/
/*jshint esversion: 6 */

"use strict";

const jwt = require('jsonwebtoken');
const config = require('../private/config');

async function generateToken(data, key) {

    if(key === 'login') {
        return jwt.sign({payload: data}, config.loginSecret);
    }
    if(key === 'password') {
        return jwt.sign(data, config.forgotPasswordSecret);
    }
}

async function verifyToken(token, key){

    if(key === 'login') {
        return jwt.verify(token, config.loginSecret)
    }
    if(key === 'password') {
        return jwt.verify(token, config.forgotPasswordSecret);
    }
}

module.exports = {generateToken, verifyToken};