const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to our home page");
  } else if (req.url === "/about") {
    res.end("Information about our company");
  } else if (req.url === '/contact') {
    res.end('Contact us at contact@example.com.');
  } else {
    res.statusCode = 404;
    res.end(`
            <h1>Oops!</h1>
            <p>We can't seem to find the page you are looking for<</p>
            <a href="/">Back home</a>
        `);
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000. You can access it at http://localhost:3000/');
});

process.on('SIGINT', () => {
  console.log('Server shutting down...');
  server.close(() => {
    console.log('Server has stopped.');
    process.exit(0);
  });
});