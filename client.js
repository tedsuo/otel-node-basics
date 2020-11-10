const http = require('http');

// This client only contains automatic instrumentation, to show 
// that you don't need to add any additional instrumentation 
// when you're just getting started.
function makeRequest() {
  http.get({
    host: 'localhost',
    port: 9000,
    path: '/hello',
  }, (response) => {
    const body = [];
    response.on('data', (chunk) => body.push(chunk));
    response.on('end', () => {
      console.log(body.toString());
    });
  });
}

// EXERCISE: Try out the patterns in server.js. 
// Use tracer.startSpan, tracer.withSpan, and span.end
// to create a span which wraps the for loop and becomes
// the parent of all the request spans, so that they all
// become part of the same trace.
for (let i = 0; i < 200; i++) {
  makeRequest();
}