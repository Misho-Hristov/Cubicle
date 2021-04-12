const { Router } = require('express');
const router = Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', async(req, res) => {
    const { username, password, repeatPassword } = req.body

    if (password != repeatPassword) {
        res.render('register', { title: 'Register failed', error: { message: 'Passwords missmatch' } });
        return;
    }

    try {
        let user = await authService.register({ username, password });

        res.render('login', { title: 'Login' });
    } catch (error) {}
});

router.get('/login', (req, res) => {

    res.render('login', { title: 'Login' });
});

router.post('/login', async(req, res) => {
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

module.exports = router;