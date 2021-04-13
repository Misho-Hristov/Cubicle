const { Router } = require('express');
const accessoryService = require('../services/accessoryService');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const router = Router();

router.get('/create', isAuthenticated, (req, res) => {
    res.render('createAccessory', { title: 'CreateAccessory' });
});

///Validation Middleware
router.post('/create', isAuthenticated, (req, res) => {
    accessoryService.create(req.body)
        .then(() => res.redirect('/products'));
});

module.exports = router;