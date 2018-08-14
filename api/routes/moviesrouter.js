var movieRouter = require('express').Router();


movieRouter.route('/movies')
    // 'GET /movie/' : {
    // 'desc' : 'get all movies',
    // 'response' : '200 application/json',
    // 'data' : '{}, {}, {}'
    //}
    .get((req, res) => {
        res.send("hello world from home");
    })
    

module.exports = movieRouter;