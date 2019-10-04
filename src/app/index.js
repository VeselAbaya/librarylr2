const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

require('./authentication')(app);

app.use(express.static(path.join(__dirname, '../templates')));
app.set('views', path.join(__dirname, '../templates'));
app.set('view engine', 'pug');

app.use('/', require('./library/library.router'));
app.use('/book', require('./book/book.router'));
app.use('/user', require('./user/user.router'));

module.exports = app;
