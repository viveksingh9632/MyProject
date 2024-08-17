const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/book');
const authRoutes = require('./routes/auth');

const session = require('express-session');

const app = express();

mongoose.connect('mongodb://localhost/booklist', { useNewUrlParser: true, useUnifiedTopology: true });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/books', bookRoutes);
app.use('/', authRoutes);

app.listen(3000, () => console.log('Server started on port 3000'));
