// const jwt = require('jsonwebtoken');
//
// const config = require('../config/config');
//
// module.exports = async function tokenDecoder(req, res, next) {
//
//     if(config.tokenExemptAPIS.includes(req.url)) {
//         next();
//     } else {
//
//         let token = req.headers['x-authorization'];
//         if(!token) {
//             res.status(403).send('Unauthorized.');
//         }
//         try {
//             let decodedToken = await jwt.verify(token, config.loginSecret);
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