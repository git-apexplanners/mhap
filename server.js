/**
 * Custom server for the Michael Hart Architects website
 * 
 * This server supports HTTPS and HTTP to HTTPS redirection.
 * It's designed for self-hosting the website.
 */

const { createServer: createHttpsServer } = require('https');
const { createServer: createHttpServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

// Check if we're in development or production
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Paths to SSL certificate files
// Update these paths to your actual certificate files
const SSL_KEY_PATH = process.env.SSL_KEY_PATH || path.join(__dirname, 'certs', 'privkey.pem');
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || path.join(__dirname, 'certs', 'fullchain.pem');

// Check if SSL certificates exist
const sslEnabled = fs.existsSync(SSL_KEY_PATH) && fs.existsSync(SSL_CERT_PATH);

// Prepare the app
app.prepare().then(() => {
  // If SSL is enabled, create HTTPS server
  if (sslEnabled) {
    try {
      const httpsOptions = {
        key: fs.readFileSync(SSL_KEY_PATH),
        cert: fs.readFileSync(SSL_CERT_PATH)
      };

      // Create HTTPS server
      createHttpsServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      }).listen(443, (err) => {
        if (err) throw err;
        console.log('> Ready on https://localhost:443');
      });

      // Create HTTP server to redirect to HTTPS
      createHttpServer((req, res) => {
        res.writeHead(301, {
          'Location': 'https://' + req.headers.host + req.url
        });
        res.end();
      }).listen(80, (err) => {
        if (err) throw err;
        console.log('> HTTP to HTTPS redirect running on http://localhost:80');
      });
    } catch (error) {
      console.error('Error setting up HTTPS server:', error);
      console.log('Falling back to HTTP server...');
      startHttpServer();
    }
  } else {
    console.log('SSL certificates not found. Starting HTTP server only.');
    startHttpServer();
  }

  // Function to start HTTP server
  function startHttpServer() {
    createHttpServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  }
});
