const fs = require('fs');

module.exports = function (fileName, data) {
    let response = fs.readFileSync(__dirname + `/${fileName}.html`, 'utf-8');
    // TODO: use parameter data instead
    response = response.replace('there', 'HEHEHE');
    return response || fs.readFileSync('./404.html');
};