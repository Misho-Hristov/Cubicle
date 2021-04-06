const { Router } = require('express');
const router = Router();

const productController = require('./controllers/productController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');

router.use('/', homeController);
router.use('/products', productController);
router.use('/accessories', accessoryController);
router.get('*', (req, res) => {
    res.render('404', { title: 'Page Not Found!' });
});

module.exports = router;