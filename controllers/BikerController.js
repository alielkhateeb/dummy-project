const Controller = require('./Controller');
const Biker = require('../models/Biker');
const URL = require('url');

class HomeController extends Controller {
    static async addNew(req, res) {
        Controller.collectRequestData(req, async data => {
            let response;
            try {
                let biker = await Biker.createNew(data);
                response = {success: 1, biker: biker, rideInGroupText: Biker.RIDE_IN_GROUP_TEXT[biker.rideInGroup]};
            } catch (err) {
                response = {success: 0, message: err.message};
            }

            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(response));
        });
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async deleteBiker(req, res) {
        let reqUrl = URL.parse(req.url, true);
        let idToDelete = reqUrl.query.id;
        let response;
        try {
            await Biker.deleteBiker(idToDelete);
            response = {success: 1};
        } catch (err) {
            response = {success: 0, message: err.message};
        }

        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(response));
    }

    static async undoDeleteBiker(req, res) {
        Controller.collectRequestData(req, async data => {
            let response;
            try {
                let biker = await Biker.undoDeleteBiker(data.id);
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