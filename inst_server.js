const opentelemetry = require('@opentelemetry/api');
const http = require('http');
  const express = require('express');
const router = express.Router();

const app = express();
const tracer = opentelemetry.trace.getTracer('server');

http.createServer({}, app).listen(9000, () => {
  console.log('server running');
});
router.route('/').get((req, res, next) => {
  const currentSpan = tracer.getCurrentSpan();
  currentSpan.setAttribute('foo', 'bar')
    .addEvent('sent', { id: '42', key: 'value' });
  res.status(200).json('OK');
});
app.use('/', router);

