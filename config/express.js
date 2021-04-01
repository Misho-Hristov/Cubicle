const express = require('express');
const handlebars = require('express-handlebars');

function setUpExpress(app) {
    app.engine('hbs', handlebars({
        extname: 'hbs',
    }));

    app.set('view engine', 'hbs');

    app.use(express.static('public'));

    app.use(express.urlencoded({
        extended: true,
    })); ///To make an object from an urlEncoded result after a secessfull request
}

module.exports = setUpExpress;