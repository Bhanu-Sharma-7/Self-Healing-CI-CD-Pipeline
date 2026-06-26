const express = require('express');
const http = require('http');

const app = express();

app.get('/', (req, res) => res.send('Hello from Express App'));

const server = app.listen(5000, () => {
  console.log('Server started, running smoke test...');

  // Adjust the delay to confirm the server is fully ready before the test
  setTimeout(() => {
    http.get('http://localhost:5000/', (res) => {
      console.log(`Status: ${res.statusCode}`);
      if (res.statusCode === 200) {
        console.log('Smoke test passed');
        server.close();
        process.exit(0);
      } else {
        console.error('Smoke test failed: received non-200 response');
        server.close();
        process.exit(1);
      }
    }).on('error', (err) => {
      console.error('Request failed:', err.message);
      server.close();
      process.exit(1);
    });
  }, 3000); // Increased to 3 seconds delay
});

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});