const fs = require('fs/promises');
const path = require('path');
const productsData = require('../products.json');

class Model {

    save() {

        productsData.push(this);

        return fs.writeFile(
            path.join(__dirname, '/../products.json'),
            JSON.stringify(productsData)
        );

    }

    static getAll() {
        return productsData;
    };

    static getOne(id) {
        return productsData.find(x => x.id == id);
    };
}

module.exports = Model;