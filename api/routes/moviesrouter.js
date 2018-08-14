var movieRouter = require('express').Router();

movieRouter.route('/movies')
    .get((req, res) => {
        res.send("hello world from home");
    });

module.exports = movieRouter;