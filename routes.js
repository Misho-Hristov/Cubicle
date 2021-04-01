const { Router } = require('express');
const router = Router();

const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');

router.use('/', homeController);
router.use('/products', productController);
router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found!' });
});

module.exports = router;