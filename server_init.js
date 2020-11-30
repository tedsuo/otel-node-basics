const { lightstep } = require('lightstep-opentelemetry-launcher-node');

// This file replaces your application's original start script,
// allowing OpenTelelmetry to load before any other modules.
// Change './server' to the path of your actual start script.
const startScript = './server';

// Use the launcher to set up and return the OpenTelemetry NodeSDK.
// Recommended parameters:
// * accessToken: required, found in Lightstep settings.
// * serviceName: required, used to identify resources.
// * serviceVersion: highly recommended, used to identify regressions.
// * propagators: tracecontext highly recommended. Also include b3 if you 
//                need to transition from b3 headers to tracecontext headers.
const sdk = lightstep.configureOpenTelemetry({
  accessToken: '<ACCESS TOKEN>',
  serviceName: 'hello-server',
  serviceVersion: 'v1.2.3',
  propagators: 'tracecontext,b3,baggage',
});

// start the sdk and wait for any installed resource detection to run.
// For auto-instrumentation to work, the SDK must be started before any 
// other packages are loaded.
sdk.start().then(() => {
  // require your application once opentelemetry has loaded.
  require(startScript);
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