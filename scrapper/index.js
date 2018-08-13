var http = require('http');

//node refused to recognize jssoup
var JSSoup = require('jssoup').default;

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
            //parse html and write to file as JSON on 'end' event
            res.on('end', () => {
                console.log(html);
                 
                //var soup = new JSSoup(html);
                //soup.
            });
        }).end();


