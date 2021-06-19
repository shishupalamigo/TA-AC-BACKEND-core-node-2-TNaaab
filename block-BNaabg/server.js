const http = require('http');
const qs = require('querystring');
const fs = require('fs');
const url = require('url');
const path = require('path');

const userDir = path.join(__dirname + '/users/');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let parsedUrl = url.parse(req.url, true);
  let user = parsedUrl.query.username;
  console.log(parsedUrl);
  let store = '';

  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    if (req.method === 'POST' && req.url === '/users') {
      let userName = JSON.parse(store).username;
      console.log({ store: JSON.parse(store)});
      fs.open(userDir + userName + '.json', 'wx', (err, fd) => {
        if (err) return console.log(err);
        console.log(fd);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            return res.end(`${userName} created successfully`);
          });
        });
      });
    }

    if (parsedUrl.pathname === '/users' && req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      return fs.createReadStream(userDir + user + '.json').pipe(res);
    }

    if (parsedUrl.pathname === '/users' && req.method === 'DELETE') {
      fs.unlink(userDir + user + '.json', (err) => {
        if (err) return console.log(err);
        return res.end(`${user} is deleted`);
      });
    }

    if (parsedUrl.pathname === '/users' && req.method === 'PUT') {
      fs.open(userDir + user + '.json', 'r+', (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);

            fs.close(fd, (err) => {
              return res.end(`${user} is updated successfully`);
            });
          });
        });
      });
    }

    res.statusCode = 404;
    res.end('Page not found');
  });
}

server.listen(3000, () => {
  console.log('Server listening on port 3k');
});
