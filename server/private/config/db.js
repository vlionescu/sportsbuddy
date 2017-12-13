const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.dbURL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection to database was successful.");
});

exports.db = db;