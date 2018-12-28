const fs = require('fs');
const { parse } = require('querystring');

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
    static collectRequestData (req, callback) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            callback(parse(body));
        });
    }
}

module.exports = Controller;