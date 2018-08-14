var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');


//routers
var moviesrouter = require('../routes/moviesrouter.js');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/movies', moviesrouter);

app.use((err, req, res, next) => {
    if(err) {
        console.log(err.message);
        res.status(500).send(err);
    }
});

module.exports = app;