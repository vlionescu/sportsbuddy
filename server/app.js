/* jshint node: true */
/*jshint esversion: 6 */
"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const path       = require('path');

const tokenDecoder = require('./private/routes/token-decoder');

require('./private/config/db.js');
require('./private/models/user.model');

let app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/')));

app.use(tokenDecoder);

app.listen(2000, () => console.log("Server running on port 2000"));

require('./private/services/routing.service')(app);