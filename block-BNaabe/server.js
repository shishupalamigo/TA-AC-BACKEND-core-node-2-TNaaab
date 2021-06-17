const http = require('http');
const qs = require('querystring');


const server = http.createServer(handleRequest);

function handleRequest (req, res) {
    let contentType = req.headers['content-type'];
    let store = '';
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        if (req.method === 'POST' && req.url === '/' && contentType === 'application/json') {
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.end(store);  
        }
        if (req.method === 'POST' && req.url === '/' && contentType === 'application/x-www-form-urlencoded') {
            res.writeHead(201, {'Content-Type': 'text/plain'});
            let parsedData = qs.parse(store);
            res.end(parsedData.captain);  
          }
    });
}
server.listen(5000, () => {
    console.log('Server listening on Port 5k!');
});

const server2  = http.createServer(handleRequest2);

function handleRequest2 (req, res) {
  let contentType = req.headers['content-type'];
  let store = '';
   req.on('data', (chunk) => {
      store += chunk;
  });
  req.on('end', () => {
      if (contentType === 'application/json') {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(store);
      }
      if (contentType === 'application/x-www-form-urlencoded') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        let parsedData = qs.parse(store);
        res.end(JSON.stringify(parsedData));
      }
  });
}

server2.listen(9000, () => {
    console.log('server listening on port 9k!');
});

const server3 = http.createServer(handleRequest3);

function handleRequest3 (req, res) {
    let contentType = req.headers['content-type'];
    let store = '';
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        if (contentType === 'application/json') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            let parsedData = JSON.parse(store);
            res.end(`<h1>${parsedData.name}</h1> <h2>${parsedData.email}</h2>`);
        }
        if (contentType === 'application/x-www-form-urlencoded') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            let parsedData = qs.parse(store);
            console.log(parsedData);
            res.end(`<h2>${parsedData.email}</h2>`); 
        }
    });
}
server3.listen(4000, () => {
    console.log('Server listening on Port 4k');
});


