const {lightstep, opentelemetry} = require('lightstep-opentelemetry-launcher-node');

const sdk = lightstep.configureOpenTelemetry({
  accessToken: 'MPFPDUu69OYtBqdh3ttXMIFz6ifeMo6AFVen/FfjQ6mav0xUA6XdRVUOuGN9t+mJPxLNZZ3aDg9jrCjSs0U=',
  serviceName: 'hello-client-49',
  propagators: 'tracecontext,correlationcontext' // supported values are b3, tracecontext, and correlationcontext
});

sdk.start().then(() => {
  // require your original startup file here
  require('./client');
});