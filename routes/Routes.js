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
    /**
     * Undo delete biker
     * TODO: implement it in the ui
     */
    appRouter.put('/biker', BikerController.undoDeleteBiker);
};