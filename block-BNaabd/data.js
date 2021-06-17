const http = require('http');
const qs = require('querystring');

const server = http.createServer(handleRequest);

function handleRequest (req, res) {
    let dataType = req.headers['content-type'];
    let store = '';
    req.on('data', (chunk) => { 
        store += chunk;
    });
    req.on('end', () => {
        if (req.method === 'POST' && req.url === '/json') {
            res.setHeader('Content-Type', 'application/json');
            res.end(store);
        }
        if (req.method === 'POST' && req.url === '/form') {
            res.setHeader('Content-Type', 'application/json');
            let parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }

    });
}

server.listen(7000, () => {
    console.log('Server up and running on port 7k!');
});
