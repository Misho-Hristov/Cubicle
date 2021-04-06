const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
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

router.get('/:productId/attach', async(req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAll();

    res.render('attachAccessory', { title: 'Attach Accessory', product, accessories });
});

router.post('/:productId/attach', (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
        .catch(() => res.status(500).end());
});

module.exports = router;