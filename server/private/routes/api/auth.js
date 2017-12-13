/*jshint node: true */
/*jshint esversion: 6 */
"use strict";

const authHandler = require('../../handlers/auth.handler');
exports.routes = [
    {
        method: 'post',
        url: '/auth/login',
        callback: authHandler.login
    },
    {
        method: 'post',
        url: '/auth/register',
        callback: authHandler.register
    },
    {
        method: 'post',
        url:'/auth/authentication',
        callback: authHandler.verifyRegistrationCode
    },
    {
        method: 'post',
        url: '/auth/resend-code',
        callback: authHandler.resendValidationCode
    },
    {
        method: 'post',
        url: '/auth/reset-password',
        callback: authHandler.resetPassword
    },
    {
        method: 'post',
        url: '/auth/change-password',
        callback: authHandler.changePassword
    },
    {
        method: 'post',
        url: '/decode-token',
        callback: authHandler.decodeToken
    },
];