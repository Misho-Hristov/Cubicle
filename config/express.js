const express = require('express');
const handlebars = require('express-handlebars');
const auth = require('../middlewares/authMiddleware');
const cookieParser = require('cookie-parser');

function setUpExpress(app) {
    app.engine('hbs', handlebars({
        extname: 'hbs',
    }));

    app.set('view engine', 'hbs');

    app.use(express.static('public'));

    app.use(express.urlencoded({
        extended: true,
    })); ///To make an object from an urlEncoded result after a secessfull request

    app.use(cookieParser());

    app.use(auth());
}

module.exports = setUpExpress;