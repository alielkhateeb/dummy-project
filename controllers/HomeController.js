const render = require('../views/render');
const Controller = require('./Controller');

class HomeController extends Controller {
    static init (req, res) {
        res.writeHead(200, {'content-type': 'text/html'});
        try {
            res.end(render('home', {
                bikers: [
                    {
                        'fullName': 'Ali',
                        'email': 'hahaha',
                        'city': 'NOWAY',
                    },
                    {
                        'fullName': 'Ali',
                        'email': 'hahaha',
                        'city': 'NOWAY',
                    },
                    {
                        'fullName': 'O',
                        'email': 'hahaha',
                        'city': 'NOWAY',
                    },

                ]
            }));
        } catch (err) {
            console.error('Error: ' + err.message);
            res.end(err.message);
        }
    }

    static test (req, res) {
        res.end('Hey, not yet pal');
    }
}

module.exports = HomeController;