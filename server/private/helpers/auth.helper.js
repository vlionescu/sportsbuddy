/*jshint node: true*/
/*jshint esversion: 6 */

"use strict";

const bcrypt       = require('bcrypt');
const config       = require('../private/config');

async function comparePasswords(user, password) {

    return bcrypt.compare(password, user.password);
}

async function cryptPassword(password) {

    return bcrypt.hash(password, 10);
}

function generateCode(){

    let code = '';
    let digits = config.digitCodeLength;

    while(digits){
        code += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789"[Math.floor(Math.random() * 51)];
        digits--;
    }

    return code;
}

function generateAccount(user, code) {
    return {
        email:               user.email.toLowerCase(),
        password:            user.password,
        name:                filterName(user.name),
        position:            user.position,
        distance:            0,
        activities:          [],
        validationCode:      user.validationCode,
        loginToken:          '',
        changePasswordToken: '',
        isAdmin:             false,
        isActivated:         false,
        photo:               'defaults/profile-pictures/default-profile.png'
    };
}


function filterName(name){
    let filteredName = '' + name[0].toUpperCase();
    for(let i = 1; i < name.length; i++) {
        filteredName += name[i - 1] === ' ' ? name[i].toUpperCase() : name[i].toLowerCase();
    }
    return filteredName;
}

 function checkRegisterData(data) {
    return true;
}

module.exports = {
    comparePasswords,
    cryptPassword,
    generateCode,
    generateAccount,
    checkRegisterData
};