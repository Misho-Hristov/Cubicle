const Cube = require('../models/cube');
const uniqId = require('uniqid');
const fs = require('fs');
const path = require('path');

const productsData = require('../products.json');

function getAll() {
    return productsData;
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

    fs.writeFile(path.join(__dirname, '/../products.json'), JSON.stringify(productsData), (err) => {
        if (err) {
            console.log(err);
            return;
        };
    })

}

module.exports = {
    create,
    getAll,
    getOne
}