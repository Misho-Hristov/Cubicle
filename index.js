const express = require('express');
const handlebars = require('express-handlebars');
const config = require('./config/config');

const app = express();

app.engine('hbs', handlebars({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { layout: false });
});

app.listen(config.PORT, () => console.log(`Server is listening on port ${config.PORT}`));