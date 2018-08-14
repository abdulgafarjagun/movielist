var movieRouter = require('express').Router();

movieRouter.route('/')
    .get((req, res) => {
        res.send("hello world from home");
    });

module.exports = movieRouter;