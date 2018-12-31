const Controller = require('../controllers/Controller');

/**
 * This is the Router class that handles all your routes
 * If you want to add routes for your application add them in routes.js
 */
class Router {
    constructor () {
        this.handlers = [];

        /**
         * Defining get route for all CSS and JS requests.
         */
        this.get('/*.css', Controller.serveCss);
        this.get('/*.js', Controller.serveJs);

        /**
         * Define application routes
         */
        require('./routes')(this);
    }

    /**
     * A new route with a custom method (GET, POST, DELETE, ... etc)
     *
     * @param {string} pathName    - The route path (e.g. '/home')
     * @param {function} fn        - The controller function that will handle requests to this route
     * @param {string} [method]    - The request method. Could be GET, POST or any valid HTTP request method.
     */
    route(pathName, fn, method) {
        this.handlers.push({
            pathName: pathName,
            fn: fn,
            method: method
        });
    }

    /**
     * A new route with the GET HTTP method
     *
     * @param {string} pathName
     * @param {function} fn
     */
    get(pathName, fn) {
        this.route(pathName, fn, 'GET');
    }

    /**
     * A new route with the POST HTTP method
     *
     * @param {string} pathName
     * @param {function} fn
     */
    post(pathName, fn) {
        this.route(pathName, fn, 'POST');
    }

    /**
     * A new route with the DELETE HTTP method
     *
     * @param {string} pathName
     * @param {function} fn
     */
    delete(pathName, fn) {
        this.route(pathName, fn, 'DELETE');
    }

    /**
     * A new route with the PUT HTTP method
     *
     * @param {string} pathName
     * @param {function} fn
     */
    put(pathName, fn) {
        this.route(pathName, fn, 'PUT');
    }
}

module.exports = new Router();