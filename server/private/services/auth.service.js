/*jshint node: true*/
/*jshint esversion: 6 */

"use strict";
const mongoose   = require('mongoose');
const nodemailer = require('nodemailer');

const User = mongoose.model('User');

const errors         = require('../config/errors.js');
const emailGenerator = require('../config/email-messages');

async function findUser(email) {

    return User.findOne({email});
}

async function generateUser(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await new User();

            user.username = data.username;
            user.email    = data.email;
            user.name     = data.name;
            user.surname  = data.surname;

            await user.setPassword(data.password);

            await user.generateCode();

            let emailMessage = emailGenerator(user, 'validate');

            await sendEmail(user.email, emailMessage);

            resolve(user)
        } catch(error) {
            reject({message: error, code: 500})
        }
    });

}

async function sendEmail(email, message){

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'alinoltean96@gmail.com',
            pass: 'qwnm120923'
        }
    });

    let mailOptions = {
        from: 'alinoltean96@gmail.com',
        to: email.toLowerCase(),
        subject: 'SportsBuddy Validation Code',
        html: message
    };

    return transporter.sendMail(mailOptions);
}

module.exports = {
    findUser,
    generateUser
};