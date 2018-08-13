var http = require('http');

var options = {
    host: 'www.google.com',
    path: '/',
    method: 'get',
    headers:{
        'Content-Type' : 'text/html'
    }
}

var getUrlAsWebPage = (opt) => {
    var html = '';
    var req = http.request(opt, (res) => {
        res.on('data', (chunk) => {
            html += chunk;
        })
        res.on('end', () => {
            console.log(html);
        });
    }).end();
}

module.export = getUrlAsWebPage(options);