var http = require('http');
var JSSoup = require('jssoup').default;

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
                var soup = new JSSoup(html);
                soup.
            });
        }).end();


