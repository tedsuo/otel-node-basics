const { lightstep } = require('lightstep-opentelemetry-launcher-node');

// Use the launcher to set up and return the OpenTelemetry NodeSDK.
// Recommended parameters:
// accessToken: required, can be found in Lightstep settings.
// serviceName: Required, for comparision across service instances.
// serviceVersion: Highly recommended for identifing regressions.
// propagators: tracecontext highly recommended. Also include b3 if you need to
//              transition from b3 headers to tracecontext headers.
const sdk = lightstep.configureOpenTelemetry({
  accessToken: '<ACCESS TOKEN>',
  serviceName: 'hello-server',
  serviceVersion: 'v1.2.3',
  propagators: 'tracecontext,b3',
});

// start the sdk and wait for any installed resource detection to run.
sdk.start().then(() => {
  // require your application startup file here.
  require('./server');
});

// Shutdown flushes any remaining spans before exit. In future versions,
// this approach to shutdown may change or be automated.
// NOTE: Due to buffering, you will have to either exit long-lived processes
//       or wait twenty seconds in order to see all of your spans.
function shutdown() {
  sdk.shutdown().then(
    () => console.log("shutdown complete"),
    (err) => console.log("error shutting down", err),
  ).finally(() => process.exit(0))
};

// Shutdown both when exiting normally and when signaled
process.on('beforeExit', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);