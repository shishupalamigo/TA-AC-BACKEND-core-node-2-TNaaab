const http = require('http');

const server  = http.createServer(handleRequest);

function handleRequest (req, res) {
    let store = ''; 
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        res.setHeader('Content-Type', 'text/plain');
        res.write(store);
        res.end();
    });
}

server.listen(3456, () => {
    console.log('Server listenening on port 3456');
});