HomeController = require('../controllers/HomeController');

/**
 * Your app routes here
 */
module.exports = function (appRouter) {
    appRouter.route('/', HomeController.init);
    appRouter.route('/home', HomeController.test);
};