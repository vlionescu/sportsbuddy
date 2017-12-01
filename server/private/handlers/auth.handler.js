/*jshint node: true*/
/*jshint esversion: 6*/

"use strict";

const authHelper      = require('../helpers/auth.helper');
const mongooseService = require('../services/db.service');
const config          = require('../private/config');
const emailer         = require('../services/email.service');

const tokenService    = require('../services/token.service');


async function login(req, res, next) {

    let email = req.body.email.toLowerCase();
    let password = req.body.password;

    if(!email || !password) {
        res.status(403).send({message: 'Please provide both username and password.'});
    }

    try {

        let user = await mongooseService.findUser(email);

        if(!user) {
            return res.status(404).send({message: 'User or password does not exist.'});
        }else if(!user.isActivated) {

            return res.status(403).send({message: 'Please activate the account.'});
        }

        let passMatch = await authHelper.comparePasswords(user, password);

        if(!passMatch) {
            return res.status(404).send({message: 'User or password does not exist.'});
        }

        let userData = {
            email:         user.email,
            name:          user.name,
            company:       user.company,
            isAdmin:       user.isAdmin,
            position:      user.position,
            distance:      user.distance,
            activities:    user.activities,
            photo:         user.photo,
            shopPurchases: user.shopPurchases
        };
        let token = await tokenService.generateToken(user, 'login');

        return res.status(200).send({
            token,
            user: userData
        });
    } catch(error) {
        res.status(500).send({message: error});
    }
}

async function register(req, res){

    let user = req.body;

    let isDataValid = authHelper.checkRegisterData(user);
    if(!isDataValid) {
        return res.status(400).send({message: 'Data syntax error'});
    }
    let companyName = user.email.split("@")[1].split('.')[0];


    try {

        let existingUser = await mongooseService.findUser(user.email);

        if(existingUser) {
            return res.status(400).send({message: 'Email is allready registered in the IVE platform.'});
        }

        let isCompanyNameValid = await mongooseService.findCompanyName(companyName);

        if(!isCompanyNameValid) {
            return res.status(400).send({message: 'The email you have supplied not currently supported by the IVE application.'});
        }

        user.password = await authHelper.cryptPassword(user.pass1);

        user.validationCode = await authHelper.generateCode();

        let editedUser = await authHelper.generateAccount(user);

        editedUser.company = companyName;

        await mongooseService.saveUser(editedUser);

        await emailer.sendEmail(editedUser.email, config.generateValidationCodeMessage(editedUser));

        res.status(200).send({name: editedUser.name, company: editedUser.company, email:editedUser.email});

    } catch(error) {
        res.status(500).send({message: error});
    }

}

async function verifyRegistrationCode(req, res){

    let email = req.body.email.toLowerCase();
    let code = req.body.code;

    try {

        let user = await mongooseService.findUser(email);

        if(!user) {
            return res.status(404).send({message: 'Email or code are invalid.'});
        } else if (user.isActivated) {
            return res.status(403).send('Account is already validated.')
        } else if(code !== user.validationCode) {
            return res.status(404).send({message: 'Email or code are invalid.'});
        }
        let updatedUser = await mongooseService.updateUser(email, {isActivated:true, $unset: {validationCode: 1}});

        if(updatedUser) {
            return res.status(200).send({message: 'Account validated.'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
}

async function resendValidationCode(req, res) {

    let userEmail = req.body.user.toLowerCase();

    try {
        let user = await mongooseService.findUser(userEmail);

        if(!user) {
            return res.status(400).send({message: 'Unexpected server error. Please try again.'});
        }

        user.validationCode = await authHelper.generateCode();

        await mongooseService.updateUser(user.email, {validationCode: user.validationCode});

        await emailer.sendEmail(user.email, config.generateValidationCodeMessage(user));

        res.status(200).send({message: 'Email was resent.'});

    } catch(error) {
        res.status(500).send({message: error});
    }
}

async function resetPassword(req, res) {

    const email = req.body.user.toLowerCase();

    try {

        let user = await mongooseService.findUser(email);

        if(!user) {
            return res.status(404).send({message: 'The account does not exist.'});
        }

        if(!user.isActivated) {
            return res.status(403).send({message: 'You must activate the account in order to reset password.'});
        }

        let payload = user.email;

        let token = await tokenService.generateToken( payload, 'password');

        emailer.sendEmail(user.email, config.generateForgotPasswordMessage(user, token));

        return res.status(200).send({message: 'An email has been sent.'});

    } catch(error) {
        res.status(500).send({message: error});
    }
}

async function changePassword(req, res) {

    const token = req.body.user.token;
    const newPassword = req.body.user.pass1;

    try {
        let decodedToken = await authHelper.verifyToken(token, 'password');

        if(!decodedToken) {
            return res.status(400).send({message: 'Unknown error please try again.'});
        }

        let user = await mongooseService.findUser(decodedToken);

        if(!user) {
            return res.status(400).send({message: 'Unknown error please try again.'});
        }

        user.password = await authHelper.cryptPassword(newPassword);

        await mongooseService.saveUser(user);

        res.status(200).send({user: user.email});

    } catch (error) {
        res.status(500).send({message: error});
    }
}

async function decodeToken(req, res) {

    let token = req.body.token;
    try {
        let decodedToken = await authHelper.verifyToken(token, 'login');

        if(token) {
            return res.status(200).send({meesage: 'Token is valid'});
        }
        return res.status(404).send({message:`No token found from route ${req.url}`});
    } catch(error) {
        res.stauts(500).error({message: error});
    }
}


module.exports = {
    login,
    register,
    verifyRegistrationCode,
    resendValidationCode,
    resetPassword,
    changePassword,
    decodeToken
};
