const opentelemetry = require('@opentelemetry/api');
const express = require('express');

// create a tracer and name it after your package
const tracer = opentelemetry.trace.getTracer('@otel-node-basics/server');

// create your express server
const app = express();

// Express instrumentation automatically creates a span for every handler
// and decorates it with HTTP semantic conventions.
app.get('/hello', (req, res) => {
  try {
    throw ("ooops");
  } catch (error) {
    // Add the exception as a properly formatted event.
    span.recordException(error);

    // Additionally, set the span's status to an error code if the 
    // exception should trigger alerting or count against an error budget.
    // Note: error codes will be simplified in the next version.
    span.setStatus({ code: opentelemetry.CanonicalCode.UNKNOWN });
  }
  // access the span created by express instrumentation
  tracer.getCurrentSpan()
    .setAttribute('projectID', '123')
    .addEvent('logging is easy', { sleep: 300 });

  // New spans are automatically added to the current trace
  // as children of the current span.
  const childSpan = tracer.startSpan("sleeper");

  // withSpan creates a new context, within which the new span
  // is set as the currentSpan.
  tracer.withSpan(childSpan, () => {
    setTimeout(() => {

      // getCurrentSpan now returns childSpan.
      const span = tracer.getCurrentSpan();
      span.setAttributes({ sleep: 300 })
      span.addEvent('pretending to work');

      // Recording exceptions: Uncaught exceptions are automatically 
      // recorded as errors. Caught exceptions can be recorded explicitly.
      try {
        throw ("ooops");
      } catch (error) {
        // Add the exception as a properly formatted event.
        span.recordException(error);

        // Additionally, set the span's status to an error code if the 
        // exception should trigger alerting or count against an error budget.
        // Note: error codes will be simplified in the next version.
        span.setStatus({ code: opentelemetry.CanonicalCode.UNKNOWN });
      }

      // Here's the actual work. If you think all of this span handling
      // looks like a lot of boilerplate, you are correct. It is much better
      // to abstract span management into a framework or utility, rather than
      // juggling spans in your application code.
      res.status(200).send('Hello World');

      // Always end the span to avoid a leak.
      span.end();
    }, 300);
  });

});

app.listen(9000);