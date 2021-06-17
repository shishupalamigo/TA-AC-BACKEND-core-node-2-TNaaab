const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const indexJSRelPath = './clients/index.js';
console.log(indexJSRelPath);

const indexJSAbstPath = `${__dirname}/clients/index.js`;
console.log(indexJSAbstPath);

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/form');
    fs.readFile('./form.html', (err, content) => {
      if (err) console.log(err);
      res.end(content);
    })

    if (req.method === 'POST' && req.url === '/form') {
      if (req.url.split('.').pop() === 'css') {
        res.setHeader('Content-Type', 'text/css');
        fs.ReadStream(`./${req.url}`).pipe(res); 
      }
      let formData = qs.parse(store);
      res.setHeader('Content-type', 'text/html');
      res.end(
        `<h2>Name: ${formData.name}</h2> <h3>Email: ${formData.email}</h3> <p>Age: ${formData.age}</p>`
      );
    }

    if (req.url.split('.').pop() === 'css') {
      res.setHeader('Content-Type', 'text/css');
      fs.ReadStream(`./${req.url}`).pipe(res); 
    }
  });
}

server.listen(5676, () => {
  console.log('Server up and running on port 5676!');
});
