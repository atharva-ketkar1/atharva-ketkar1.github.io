const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Get the requested URL and map it to the corresponding file
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Read the file and serve its contents
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    // Set the appropriate Content-Type header based on the file extension
    const extname = path.extname(filePath);
    const contentType = getContentType(extname);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

function getContentType(extname) {
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
