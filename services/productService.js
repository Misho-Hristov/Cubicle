const Cube = require('../models/cube');
const uniqId = require('uniqid');
const fs = require('fs/promises');
const path = require('path');

const productsData = require('../products.json');

function getAll(query) {
    let result = productsData;

    if (query.search) {
        result = result.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }

    if (query.from) {
        result = result.filter(x => Number(x.level) >= query.from);
    }

    if (query.to) {
        result = result.filter(x => Number(x.level) <= query.to);
    }

    return result;
}

function getOne(id) {
    return productsData.find(x => x.id == id);
}

function create(data) {
    let cube = new Cube(
        uniqId(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    productsData.push(cube);

    return fs.writeFile(
        path.join(__dirname, '/../products.json'),
        JSON.stringify(productsData)
    )
}

module.exports = {
    create,
    getAll,
    getOne
}