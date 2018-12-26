const fs = require('fs');

class Controller {
    static serveCss (req, res) {
        console.log(req.url);
        res.writeHead(200, {'content-type': 'text/css'});
        res.end(fs.readFileSync(__dirname + '/../public' + req.url));
    }
    static serveJs (req, res) {
        console.log(req.url);
        res.writeHead(200, {'content-type': 'text/javascript'});
        res.end(fs.readFileSync(__dirname + '/../public' + req.url));
    }
}

module.exports = Controller;