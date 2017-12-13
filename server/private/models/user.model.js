/*jshint node: true*/
/*jshint esversion: 6 */

"use strict";


const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, `'can't be blank'`],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    name: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z]+$/, 'is invalid'],
        index: true
    },
    surname: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z]+$/, 'is invalid'],
        index: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isValidated: {
        type: Boolean,
        default: false
    },
    image: String,
    hash: String,
    validationCode: String,
    created: {
        type: Date,
        default: Date.now()
    },
    participations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Games'
    }],
    preferences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sports'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.validatePassword = (password) => {
    return bcrypt.compareSync(password, this.hash);
};

UserSchema.methods.setPassword = function (password) {
    let salt = bcrypt.genSaltSync(config.saltRounds);
    this.hash = bcrypt.hashSync(password, salt);
    return this.save();
};

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id:       this._id,
        username: this.username,
        isAdmin:  this.isAdmin,
        exp: parseInt(exp.getTime() / 1000),
    }, config.loginSecret);
};

UserSchema.methods.generateCode =  function () {
    let code = '';
    let possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 6; i++) {
        code += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    this.validationCode = code;

    return this.save();
};

UserSchema.methods.authData = () => {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        image: this.image || this.getDefaultProfilePicture(),
        preferences: this.preferences,
        friends: this.friends,
        mathces: this.mathces
    };
};

UserSchema.methods.getDefaultProfilePicture = () => {
    return `${config.serverURL}images/defaults/${this.name[0]}.jpg`;
};

UserSchema.methods.userData = (user) => {
    return {
        username: this.username,
        bio: this.bio,
        image: this.image || this.getDefaultProfilePicture(),
        following: user ? user.isFollowing(this._id) : false
    };
};

UserSchema.methods.saveImage = (image) => {
    this.image = image;
    return this.save();
};

UserSchema.methods.addFavorite = (id) => {
    if(!this.friends.includes(id)) {
        throw Error('Already favorite.');
    }
    this.friends.push(id);

    return this.save();
};

UserSchema.methods.unFavorite = (id) => {
    this.favorites.remove(id);
    return this.save();
};

UserSchema.methods.isFavorite = (id) => {
    return this.favorites.some((favoriteId) => {
        return favoriteId.toString() === id.toString();
    });
};

UserSchema.methods.addFriend = (id) => {
    if(this.friends.includes(id)){
        this.following.push(id);
    }

    return this.save();
};

UserSchema.methods.unFriend = (id) => {
    this.following.remove(id);
    return this.save();
};

UserSchema.methods.isFriend = (id) => {
    return this.following.some(function(followId){
        return followId.toString() === id.toString();
    });
};


mongoose.model('User', UserSchema);