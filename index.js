/**
 * Load environment variables from .env file to process.env
 */
require('dotenv').config();

let http = require('http');
let render = require('./views/render');
let router = require('./routes/router');

let index = http.createServer(function(req, res) {
    let handled = false;
    for (let handler of router.handlers) {
        // TODO: add handler.method checking
        if(req.url.match(handler.pathName)) {
            console.log(handler);
            handler.fn(req, res);
            handled = true;
            break;
        }
    }

    if (!handled) {
        console.error(req.url + ' is not found');
        res.end(render('404'));
    }
});

index.listen(process.env.PORT);
console.log('listening to http://' + process.env.HOST + ':' + process.env.PORT);