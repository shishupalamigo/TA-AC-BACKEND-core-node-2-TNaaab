const path =  require('path');

const serverJSPath = __filename;
console.log(serverJSPath);

const appJSPath = `${__dirname}/app.js`;
console.log(appJSPath);

const indexPath = `./index.html`;
console.log(indexPath);

const indexHtmlPath = path.join(__dirname, 'index.html');
console.log(indexHtmlPath);