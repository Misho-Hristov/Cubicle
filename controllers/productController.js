const { Router } = require('express');
const productService = require('../services/productService');
const router = Router();
const { validateProduct } = require('./helpers/productHelper');

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            // console.log(products);
            res.render('home', { title: 'Browse', products });
        })
        .catch(() => res.status(500).end());
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'CreateCube' });
});

router.post('/create', validateProduct, (req, res) => {
    ///VALIDATE INPUT(CRUCIAL)
    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
});

router.get('/details/:productId', async(req, res) => {
    let product = await productService.getOne(req.params.productId);

    res.render('details', { title: 'ProductDetails', product });
});

module.exports = router;