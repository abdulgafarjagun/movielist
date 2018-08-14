var movieRouter = require('express').Router();


movieRouter.route('/movies')
    // 'GET /movie/' : {
    // 'desc' : 'get all movies',
    // 'response' : '200 application/json',
    // 'data' : '{}, {}, {}'
    //}
    .get((req, res) => {
        //TODO: get all movies for database and return as JSON
        res.send("hello world from home");
        // res.json()
    })
    .post((req, res) => {
        //TODO: create a new movie and store in database
    });

movieRouter.route('/movies/:id')
    .put((req, res) => {
        //TODO: update movie in database
    })
    .delete((req, res) => {
        //TODO: delete movie in database
    })
    .get((req, res) => {
        //TODO: get a single movie from database
    });
    

module.exports = movieRouter;