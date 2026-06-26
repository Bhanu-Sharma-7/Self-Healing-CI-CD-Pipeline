const express = require('express');
const http = require('http');

const app = express();

app.get('/', (req, res) => res.send('Hello from Express App'));

const server = app.listen(5000, () => {
  console.log('Server started, running smoke test...');

  // Added a small delay before making the HTTP request to ensure the server is fully started
  setTimeout(() => {
    http.get('http://localhost:5000/', (res) => {
      console.log(`Status: ${res.statusCode}`);
      if (res.statusCode === 200) {
        console.log('Smoke test passed');
        server.close();
        process.exit(0);
      } else {
        server.close();
        process.exit(1);
      }
    }).on('error', (err) => {
      console.error('Request failed:', err.message);
      server.close();
      process.exit(1);
    });
  }, 1000); // 1 second delay
});