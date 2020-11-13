const opentelemetry = require('@opentelemetry/api');
const express = require('express');

// create a tracer and name it after your package
const tracer = opentelemetry.trace.getTracer('@otel-node-basics/server');

// create your express server
const app = express();

// Express instrumentation automatically creates a span for every handler
// and decorates it with HTTP semantic conventions.
app.get('/hello', (req, res) => {

  // access the span created by express instrumentation
  // and add useful application-level attributes and events/
  tracer.getCurrentSpan()
    .setAttribute('projectID', '123')
    .addEvent('logging is easy', { sleep: 300 });

  // Uset the tracer to start a new span. Spans are automatically added to 
  // the trace as children of the current span.
  const childSpan = tracer.startSpan("sleeper");

  // withSpan creates a new context for your new span.
  // You should *almost* always create a new context.
  tracer.withSpan(childSpan, () => {

    // within this context, getCurrentSpan 
    // now returns childSpan.
    const span = tracer.getCurrentSpan();

    const latency = 300
    // multipe attributes can be set at the same time
    // with setAttributes
    span.setAttributes({
      timeout: true,
      sleep: latency,
    });

    // add more events to the span's timeline
    span.addEvent('starting timeout');
    setTimeout(() => {
      span.addEvent('timeout complete');

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
        span.setStatus({ code: opentelemetry.CanonicalCode.INTERNAL });
      }

      // Here's the actual work. If you think all of this span handling
      // looks like a lot of boilerplate, you are correct. It is much better
      // to abstract span management into a framework or utility, rather than
      // juggling spans in your application code.
      res.status(200).send('Hello World');

      // Ending a span records its duration and sends the span to the exporter.
      // WARNING: Always end spans to avoid a leak.
      span.end();
    }, latency);
  });

});

app.listen(9000);