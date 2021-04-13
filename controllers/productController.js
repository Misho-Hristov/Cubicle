const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const router = Router();
const { validateProduct } = require('./helpers/productHelper');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            // console.log(products);
            res.render('home', { title: 'Browse', products });
        })
        .catch(() => res.status(500).end());
});

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'CreateCube' });
});

router.post('/create', isAuthenticated, validateProduct, (req, res) => {
    ///VALIDATE INPUT(CRUCIAL)
    productService.create(req.body, req.user._id)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
});

router.get('/details/:productId', async(req, res) => {
    let product = await productService.getOneWithAccessories(req.params.productId);

    res.render('details', { title: 'ProductDetails', product });
});

router.get('/:productId/attach', isAuthenticated, async(req, res) => {
    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.getAllWithoutAttached(product.accessories);

    res.render('attachAccessory', { title: 'Attach Accessory', product, accessories });
});

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
        .catch(() => res.status(500).end());
});

router.get('/:productId/edit', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            res.render('editCube', product);
        });
});

router.post('/:productId/edit', isAuthenticated, validateProduct, (req, res) => {
    productService.updateOne(req.params.productId, req.body)
        .then(response => {
            res.redirect(`/products/details/606da6851d02a80c94a09d9f`);
        });
});

router.get('/:productId/delete', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {
            if (req.user._id != product.creator) {
                console.log(req.user._id);
                console.log(product.creator);
                res.redirect('/products')
            } else {
                res.render('deleteCube', product);
            }
        });
});

router.post('/:productId/delete', (req, res) => {
    productService.deleteOne(req.params.productId)
        .then(res.redirect('/products'));
});

module.exports = router;