const render = require('../views/render');
const Controller = require('./Controller');
const Biker = require('../models/Biker');

class HomeController extends Controller {
    static async init(req, res) {
        res.writeHead(200, {'content-type': 'text/html'});
        try {
            let bikers = await Biker.getAllBikers();

            res.end(render('home', {
                bikers: bikers,
                RIDE_IN_GROUP_ALWAYS: Biker.RIDE_IN_GROUP_ALWAYS,
                RIDE_IN_GROUP_SOMETIMES: Biker.RIDE_IN_GROUP_SOMETIMES,
                RIDE_IN_GROUP_NEVER: Biker.RIDE_IN_GROUP_NEVER,
            }));
        } catch (err) {
            console.error('Error: ' + err.message);
            res.end(err.message);
        }
    }
}

module.exports = HomeController;