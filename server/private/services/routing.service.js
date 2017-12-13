const auth = require('../routes/api/auth');

module.exports = (app) => {
    function generateRoutes(routes) {

        routes.forEach(function (route) {
            app[route.method](route.url, route.callback);
        });
    }

    generateRoutes(auth.routes);
};