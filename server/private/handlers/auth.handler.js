/*jshint node: true*/
/*jshint esversion: 6*/

"use strict";

const mongoose = require('mongoose');

const authService = require('../services/auth.service');

const User = mongoose.model('User');

async function login(req, res) {

    const loginData = req.body;

    if(!loginData.username || !loginData.password) {
       return res.status(400).send('Username or password ar missing.')
    }
    try{
        let user = await authService.findUser({email});

        if(!user) {
            return res.status(404).send('Username or password is incorrect.');
        }

        if(!user.validatePassword(loginData.password)) {
            return res.status(404).send('Username or password is incorrect.');
        }

        let token = await user.generateJWT();
        if(!token) {
            return res.status(500).send('Internal server error please try again.');
        }
        res.status(200).send({token});
    }catch(error) {
        res.status(500).send({error});
    }
}

async function register(req, res) {
    try {
        await authService.generateUser(req.body);
        res.status(200).send({message: 'User successfully created.'});

    } catch(error) {
        console.log('err', error);
        res.status(500).send(error);
    }
}

async function verifyRegistrationCode(req, res){

    // let email = req.body.email.toLowerCase();
    // let code = req.body.code;
    //
    // try {
    //
    //     let user = await mongooseService.findUser(email);
    //
    //     if(!user) {
    //         return res.status(404).send({message: 'Email or code are invalid.'});
    //     } else if (user.isActivated) {
    //         return res.status(403).send('Account is already validated.')
    //     } else if(code !== user.validationCode) {
    //         return res.status(404).send({message: 'Email or code are invalid.'});
    //     }
    //     let updatedUser = await mongooseService.updateUser(email, {isActivated:true, $unset: {validationCode: 1}});
    //
    //     if(updatedUser) {
    //         return res.status(200).send({message: 'Account validated.'});
    //     }
    // } catch(error) {
    //     res.status(500).send(error);
    // }
}

async function resendValidationCode(req, res) {
    //
    // let userEmail = req.body.user.toLowerCase();
    //
    // try {
    //     let user = await mongooseService.findUser(userEmail);
    //
    //     if(!user) {
    //         return res.status(400).send({message: 'Unexpected server error. Please try again.'});
    //     }
    //
    //     user.validationCode = await authHelper.generateCode();
    //
    //     await mongooseService.updateUser(user.email, {validationCode: user.validationCode});
    //
    //     await emailer.sendEmail(user.email, config.generateValidationCodeMessage(user));
    //
    //     res.status(200).send({message: 'Email was resent.'});
    //
    // } catch(error) {
    //     res.status(500).send({message: error});
    // }
}

async function resetPassword(req, res) {

    // const email = req.body.user.toLowerCase();
    //
    // try {
    //
    //     let user = await mongooseService.findUser(email);
    //
    //     if(!user) {
    //         return res.status(404).send({message: 'The account does not exist.'});
    //     }
    //
    //     if(!user.isActivated) {
    //         return res.status(403).send({message: 'You must activate the account in order to reset password.'});
    //     }
    //
    //     let payload = user.email;
    //
    //     let token = await tokenService.generateToken( payload, 'password');
    //
    //     emailer.sendEmail(user.email, config.generateForgotPasswordMessage(user, token));
    //
    //     return res.status(200).send({message: 'An email has been sent.'});
    //
    // } catch(error) {
    //     res.status(500).send({message: error});
    // }
}

async function changePassword(req, res) {

    // const token = req.body.user.token;
    // const newPassword = req.body.user.pass1;
    //
    // try {
    //     let decodedToken = await authHelper.verifyToken(token, 'password');
    //
    //     if(!decodedToken) {
    //         return res.status(400).send({message: 'Unknown error please try again.'});
    //     }
    //
    //     let user = await mongooseService.findUser(decodedToken);
    //
    //     if(!user) {
    //         return res.status(400).send({message: 'Unknown error please try again.'});
    //     }
    //
    //     user.password = await authHelper.cryptPassword(newPassword);
    //
    //     await mongooseService.saveUser(user);
    //
    //     res.status(200).send({user: user.email});
    //
    // } catch (error) {
    //     res.status(500).send({message: error});
    // }
}

async function decodeToken(req, res) {
    //
    // let token = req.body.token;
    // try {
    //     let decodedToken = await authHelper.verifyToken(token, 'login');
    //
    //     if(token) {
    //         return res.status(200).send({meesage: 'Token is valid'});
    //     }
    //     return res.status(404).send({message:`No token found from route ${req.url}`});
    // } catch(error) {
    //     res.stauts(500).error({message: error});
    // }
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
