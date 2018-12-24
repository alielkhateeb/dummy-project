let HomeController = require('./controllers/HomeController');

class Router {
    constructor () {
        this.handlers = [];
    }

    route(pathName, fn, method) {
        this.handlers.push({
            pathName: pathName,
            fn: fn,
            method: method
        });
    }

    get(pathName, controllerName, fn) {
        this.route(pathName, controllerName, fn, 'GET');
    }

    post(pathName, controllerName, fn) {
        this.route(pathName, controllerName, fn, 'POST');
    }
}

let router = new Router();

// Add your routes here
router.route('/', HomeController.init);
router.route('/home', HomeController.test);

module.exports = router;