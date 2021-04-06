const Cube = require('../models/cube');
const uniqId = require('uniqid');


function getAll(query) {
    let products = Cube.getAll();

    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    }

    if (query.from) {
        products = products.filter(x => Number(x.level) >= query.from);
    }

    if (query.to) {
        products = products.filter(x => Number(x.level) <= query.to);
    }

    return products;
}

function getOne(id) {
    return Cube.getOne(id);
}

function create(data) {
    let cube = new Cube(
        uniqId(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    // return productsData.push(cube);
    return cube.save();
}

module.exports = {
    create,
    getAll,
    getOne
}