const http = require('http');
const path = require('path');


const server = http.createServer(handleRequest);

function handleRequest(req, res) {
res.end('Ok');
}
server.listen(3000, () => {
    console.log('Server is listening to port 3k');
});

console.log(__dirname);
console.log(__filename);

const serverPath =  path.join(__dirname, './server.js');
console.log(serverPath); 

