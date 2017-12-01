/* jshint node: true */
/*jshint esversion: 6 */
"use strict";

const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const cors          = require('cors');

//
// mongoose.connect(config.dbURL);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/')));


app.use(tokenDecoder);


// async function tokenDecoder(req, res, next) {
//
//     if(tokenExemptAPIS.includes(req.url)) {
//         next();
//     } else {
//
//         let token = req.headers['x-authorization'];
//
//         try {
//             let decodedToken = await tokenService.verifyToken(token, 'login');
//
//             if(decodedToken) {
//                 let user = decodedToken.payload;
//                 res.locals.email   = user.email;
//                 res.locals.name    = user.name;
//                 res.locals.company = user.company;
//                 res.locals.isAdmin = user.isAdmin;
//
//                 if(!user.isAdmin && adminAPIS.includes(req.url)) {
//                     return res.status(403).send({message: 'Forbidden. only admins can access this resource.'});
//                 }
//
//                 next();
//             }
//         } catch(error) {
//             res.status(403).send({message: 'Bad request.'}).end();
//         }
//     }
//
// }


app.listen(2000, function () {
    console.log("Server running on port 2000");
});

// routes(auth);
// routes(account);
// routes(activity);
// routes(shop);
// routes(dashboard);
// routes(admin);

function routes(routes){
    routes.forEach(function(route){
        app[route.method](route.url, route.callback);
    });
}

module.exports = app;