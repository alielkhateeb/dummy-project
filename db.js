module.exports = function () {
    const mongoose = require('mongoose');
    // noinspection JSIgnoredPromiseFromCall
    mongoose.connect('mongodb://127.0.0.1/dummyApp', {
        useNewUrlParser: true,
        useFindAndModify: false
    });

    console.log('initializing DB');

    const db = mongoose.connection;
    db.once('open', function () {
        console.log('connected');

        require('./models/Biker');
    });

    db.on('error', console.error.bind(console, 'connection error:'));

    return db;
};
