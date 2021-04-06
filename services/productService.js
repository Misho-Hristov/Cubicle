const productData = require('../products.json');

function getAll(query) {
    let products = productData;

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
    return productsData.find(x => x.id == id);
}

function create(data) {
    let cube = new Cube(data);

    // return productsData.push(cube);
    return cube.save();
}

module.exports = {
    create,
    getAll,
    getOne
}