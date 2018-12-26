const render = require('../views/render');
const Controller = require('./Controller');

class HomeController extends Controller {
    static init (req, res) {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(render('home'));
    }

    static test (req, res) {
        res.end('Hey, not yet pal');
    }
}

module.exports = HomeController;