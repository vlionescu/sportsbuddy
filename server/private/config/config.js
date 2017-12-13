'use strict';

const config = {
    dbURL: 'mongodb://localhost:27017/SportsBuddy',
    saltRounds: 10,
    serverURL: 'http://localhost:2000/',
    loginSecret: '5up3rm4n',
    tokenExemptAPIS: [
        '/auth/login',
        '/auth/register',
        '/auth/authentication',
        '/auth/resend-code',
        '/auth/reset-password',
        '/auth/change-password'
    ]
};

module.exports = config;