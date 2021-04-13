const { Router } = require('express');
const router = Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

router.get('/register', isGuest, (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', isGuest, async(req, res) => {
    const { username, password, repeatPassword } = req.body

    if (password != repeatPassword) {
        res.render('register', { title: 'Register failed', error: { message: 'Passwords missmatch' } });
        return;
    }

    try {
        let user = await authService.register({ username, password });

        res.render('login', { title: 'Login' });
    } catch (error) {
        res.render('register', { error })
    }
});

router.get('/login', isGuest, (req, res) => {

    res.render('login', { title: 'Login' });
});

router.post('/login', isGuest, async(req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });

        res.cookie(COOKIE_NAME, token);
        res.redirect('/products');
    } catch (error) {
        console.log(error);
        res.render('login', { error })
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/products');
});

module.exports = router;