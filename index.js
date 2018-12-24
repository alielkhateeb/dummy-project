/**
 * Load environment variables from .env file to process.env
 */
require('dotenv').config();

let http = require('http');
let render = require('./views/render');
let router = require('./router');

let index = http.createServer(function(req, res) {
    let handled = false;
    for (let handler of router.handlers) {
        if(req.url === handler.pathName) {
            handler.fn(req, res);
            handled = true;
        }
    }

    if (!handled) {
        console.error(req.url + ' is not found');
        res.end(render('404'));
    }
});

index.listen(process.env.PORT);
console.log('listening to http://' + process.env.HOST + ':' + process.env.PORT);