const http = require('http');
const fs = require('fs');

const server = http.createServer(handleRequest);

function handleRequest (req, res) {
    fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(3333, () => {
    console.log('Server listening at port 3333');
});