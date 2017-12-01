/*jshint node: true*/
/*jshint esversion: 6 */

"use strict";

const nodemailer = require('nodemailer');

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
        subject: 'IVE Validation Code',
        text: message
    };

    return transporter.sendMail(mailOptions);
}

module.exports = {sendEmail};