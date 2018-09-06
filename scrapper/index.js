var http = require('http');
const cheerio = require('cheerio');
const movie = require('../schema/movie-schema.js');
const context = require('mongoose');
const movieSchemaSpec = require('../api/models/movie-model.js');

    var options = {
        host: 'silverbirdcinemas.com',
        path: '/cinema/accra/',
        method: 'get',
        headers:{
            'Content-Type' : 'text/html'
        }
    }
        //variable to hold html comtent
        var html = '';

        http.request(options, (res) => {
            //add html data in chunks
            res.on('data', (chunk) => {
                html += chunk;
            })
            //parse html and write to mongo as JSON on 'end' event
            res.on('end', () => {
                const $ = new cheerio.load(html);
                context.connect('mongodb://localhost/movies');
                const movieSchema = new context.Schema(movieSchemaSpec);
                var dbMovies = context.model('movies', movieSchema);

                //#region 

                // $('.article.entry-item').each((i, div) => {

                //     console.log($('.entry-title', '.entry-content').eq(i).text());
                //     console.log($('.entry-date').eq(i).text());
                //     console.log($('p.cinema_page_showtime').children('strong').eq(i).text());
                //     console.log($('div.desc-mv').eq(i).text().slice(8, 20));
                //     console.log($('div.note').eq(i).text().slice(6, 200));
                //     console.log($('div.entry-rating span.mcount').eq(i).text().replace('votes', ''));
                //     console.log($('div.entry-rating span.rate').eq(i).text());
                //     console.log($('div.note').next().eq(i).text().slice(9, 30));

                //#endregion

                context.connect('mongodb://localhost/movies');
                const movieSchema = new context.Schema(movieSchemaSpec);
                var dbMovies = context.model('movies', movieSchema);

                $('article.entry-item').each((i, div) => {
                    
                    movie.name = $('.entry-title', '.entry-content').eq(i).text();
                    movie.duration = $('.entry-date').eq(i).text();
                    movie.time = $('p.cinema_page_showtime').children('strong').eq(i).text();
                    movie.releaseDate = $('div.desc-mv').eq(i).text().slice(8, 20);
                    movie.genre = $('div.note').eq(i).text().slice(6, 200);
                    movie.language = $('div.note').next().eq(i).text().slice(9, 30);
                    movie.votes = $('div.entry-rating span.mcount').eq(i).text().replace('votes', '');
                    movie.rate = $('div.entry-rating span.rate').eq(i).text();


                    dbMovies.create(movie)
                    .then((err,movie) => {
                        console.log(err, movie);
                    });
                });
            });
        }).end();


