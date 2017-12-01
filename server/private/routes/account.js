"use strict";

const accountHandler = require('../handlers/account.handler');

exports.routes = [
    {
        method:'get',
        url:'/accounts',
        callback: accountHandler.getAccounts
    },
    {
        method:'get',
        url:'/account',
        callback: accountHandler.getAccount
    },
    {
        method:'patch',
        url:'/account/edit',
        callback: accountHandler.updateAccount
    },
    {
        method: 'patch' ,
        url: '/account/add-funds',
        callback: accountHandler.addFunds
    },
    {
        method: 'patch' ,
        url: '/account/withdraw-funds',
        callback: accountHandler.withdrawFunds
    },
    {
        method: 'get',
        url: '/account/profile-picture',
        callback: accountHandler.getProfilePictureURL
    },
    {
        method: 'post',
        url: '/upload/profile-pictures',
        callback: accountHandler.uploadProfilePicture
    }
];

