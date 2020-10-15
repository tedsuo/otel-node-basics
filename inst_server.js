const opentelemetry = require('@opentelemetry/api');
const http = require('http');

const tracer = opentelemetry.trace.getTracer('server');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(9000, '127.0.0.1', () => {
  const currentSpan = tracer.getCurrentSpan();
  currentSpan.setAttribute("foo", "bar")
             .addEvent('sent', { id: '42', key: 'value' });
  childSpan = tracer.startSpan('my-span');
  tracer.withSpan(childSpan, () => {
    console.log(`Server running at http://localhost:9000/`);
  })
});