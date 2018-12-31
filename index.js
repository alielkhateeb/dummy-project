/**
 * Load environment variables from .env file to process.env
 */
require('dotenv').config();
const URL = require('url');

require('./db')();

let http = require('http');
let render = require('./views/render');
let router = require('./routes/router');

let index = http.createServer(function(req, res) {
    let methodNotAllowed = false;
    let { pathname } = URL.parse(req.url, true);
    for (let handler of router.handlers) {
        /**
         * check request url OR if the pathname has * then match it as regex (for CSS and JS)
         */
        // console.log('comparing ' + myURL.pathname + ' with ' + handler.pathName);
        if(handler.pathName === pathname || (handler.pathName.indexOf('*') !== -1 && pathname.match(handler.pathName))) {
            if (handler.method && handler.method !== req.method) {
                methodNotAllowed = true;
                continue;
            }

            handler.fn(req, res);
            return;
        }
    }

    // TODO: implement better error handling
    if (methodNotAllowed) {
        console.error(req.url + ' is not found');
        res.writeHead(405);
        res.end('Method ' + req.method + ' is not allowed');
    } else {
        console.error(req.url + ' is not found');
        res.end(render('404', {page: req.url}));
    }
});

index.listen(process.env.PORT);
console.log('listening to http://localhost:' + process.env.PORT);