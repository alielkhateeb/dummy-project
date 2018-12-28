const Controller = require('./Controller');
const Biker = require('../models/Biker');

class HomeController extends Controller {
    static async addNew(req, res) {
        Controller.collectRequestData(req, async data => {
            let response;
            try {
                let biker = await Biker.createNew(data);
                response = {success: 1, biker: biker};
            } catch (err) {
                response = {success: 0, message: err.message};
            }

            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(response));
        });
    }
}

module.exports = HomeController;