var http = require('http');

//node refused to recognize jssoup
// var JSSoup = require().default;
const cheerio = require('cheerio');
const movie = require('../schema/movie-schema.js');
const context = require('mongoose');
const movieSchemaSpec = require('../api/models/movie-model.js');

    //options for web page content, works when i print to console (node index.js)

    //my strategy was to pass the html page from the http request directly to jssoup, then parse it and 
    //save the content to file as JSON.

    //BLOCKER:
    //JSSoup is given me the following error
    // [ts]
    // Could not find a declaration file for module 'jssoup'. '/Users/seniorconsultant/Projects/movielist/scrapper/node_modules/jssoup/dist/lib/jssoup.js' implicitly has an 'any' type.
    // Try `npm install @types/jssoup` if it exists or add a new declaration (.d.ts) file containing `declare module 'jssoup';`
    // module "/Users/seniorconsultant/Projects/movielist/scrapper/node_modules/jssoup/dist/lib/jssoup"
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

                $('.entry-title').each((i, div) => {
                    
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


