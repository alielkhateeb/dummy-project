HomeController = require('../controllers/HomeController');
BikerController = require('../controllers/BikerController');

/**
 * Your app routes here
 *
 * @param {Router} appRouter
 */
module.exports = function (appRouter) {
    appRouter.route('/', HomeController.init);
    appRouter.route('/home', HomeController.init);
    appRouter.post('/biker', BikerController.addNew);
    appRouter.delete('/biker', BikerController.deleteBiker);
    appRouter.put('/biker', BikerController.undoDeleteBiker);
};