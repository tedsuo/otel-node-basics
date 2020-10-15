const opentelemetry = require('@opentelemetry/api');

const http = require('http');
const tracer = opentelemetry.trace.getTracer('client');

function makeRequest() {
  const span = tracer.startSpan('makeRequest');
  tracer.withSpan(span, () => {

    http.get({
      host: 'localhost',
      port: 9000,
      path: '/',
    }, (response) => {
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => {
        console.log(body.toString());
        span.end();
      });
    });

  });
}

for (let i = 0; i < 60; i++) {
  makeRequest();
}