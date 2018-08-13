var http = require('http');

    var options = {
        host: 'silverbirdcinemas.com',
        path: '/cinema/accra/',
        method: 'get',
        headers:{
            'Content-Type' : 'text/html'
        }
    }
        var html = '';

        http.request(options, (res) => {
            res.on('data', (chunk) => {
                html += chunk;
            })
            res.on('end', () => {
                console.log(html);
            });
        }).end();
        




