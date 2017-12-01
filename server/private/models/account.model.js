/*jshint node: true*/
/*jshint esversion: 6 */

"use strict";

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let accountSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
    company: String,
    position: String,
    distance: Number,
    activities: Array,
    pendingActivities: Array,
    validationCode: String,
    isAdmin: Boolean,
    isActivated: Boolean,
    photo: String,
    shopPurchases: Array
});

module.exports = mongoose.model('account', accountSchema);