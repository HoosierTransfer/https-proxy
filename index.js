const https = require('https');
const fs = require('fs');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

const server = https.createServer(options, (req, res) => {
  console.log(`Received request for: ${req.url}`);
  proxy.web(req, res, { target: 'https://example.com' });

  proxy.on('error', (err) => {
    console.error(`Proxy error: ${err}`);
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    res.end('Proxy Error');
  });
});

server.listen(8080, () => {
  console.log('HTTPS Proxy server is listening on port 8080');
});
