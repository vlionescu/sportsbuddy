/*jshint node: true*/
/*jshint esversion: 6*/

"use strict";

const imageService    = require('../services/image.service');
const uploadService   = require('../services/upload.service');
const mongooseService = require('../services/db.service');

const config          = require('../private/config');

async function getAccounts(req, res) {

    try {

        let accounts = await mongooseService.getAccounts();

        res.status(200).send(accounts);
    } catch(error) {
        console.error(error);
    }
}

async function getAccount(req, res) {
    try {

        let account = await mongooseService.findUser(res.locals.email);

        if(!account) {
            res.status(404).send({message: 'The account was not found'});
        } else {

            let userData = {
                email:         account.email,
                name:          account.name,
                company:       account.company,
                isAdmin:       account.isAdmin,
                position:      account.position,
                distance:      account.distance,
                activities:    account.activities,
                photo:         account.photo,
                shopPurchases: account.shopPurchases
            };

            res.status(200).send(userData);
        }

    } catch(error) {
        console.error(error);
    }
}

async function updateAccount(req, res) {

    try {

        await mongooseService.updateAccount(res.locals.email, req.body);
        let updatedUser = await mongooseService.findUser(res.locals.email);

        res.status(200).send({user:{name: updatedUser.name, position: updatedUser.position}});

    } catch(error) {
        console.error(error);
    }
}

async function addFunds(req, res){

    try {
        await mongooseService.addFunds(req.body.user._id, req.body.user.distance, req.body.funds);
        res.status(200).send("Funds added.");

    } catch(error) {
        console.error(error);
    }
}

async function withdrawFunds(req, res){

    try {
        await mongooseService.withdrawFunds(res.locals.email, req.body.shopItem);
        res.status(200).send('Funds withdrawn.');

    } catch(error) {
        console.error(error);
    }
}

async function uploadProfilePicture(req, res){

    uploadService.upload(req, res, async function (err) {
        if(err) {
            if(err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).send({message: 'Image file size exceeded.'});
            } else if(err.code === 'EXTENSION_NOT_SUPPORTED') {
                return res.status(415).send({message: 'File type not supported.'})
            }
            return res.status(500).send({message: err.code});
        }
        try {
            let photoName = res.locals.email.split('.')[0];
            let url = `${res.locals.company}/profile-pictures/${photoName}`;
            let photoSource = `temp/${req.headers['x-photo']}`;
            let photoDest = `uploads/stored/${url}`;

            await imageService.copyPhoto(photoSource, photoDest);

            await mongooseService.updatePicture(res.locals.email, url);

            let user = await mongooseService.findUser(res.locals.email);

            res.status(200).send({photo: user.photo});
        } catch(error) {
            res.status(500).send({message: error});
        }


    });
}

async function getProfilePictureURL(req, res) {

    try {
        let user = await mongooseService.findUser(res.locals.email);

        return res.status(200).send({photo: user.photo})
    } catch(error) {
        res.status(500).send({message: error});
    }

}

module.exports = {
    withdrawFunds,
    addFunds,
    updateAccount,
    getAccount,
    getAccounts,
    getProfilePictureURL,
    uploadProfilePicture,
};
