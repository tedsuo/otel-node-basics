# OpenTelemetry Node Basics
Hello there! You've found one of my OpenTelemetry playgrounds. This example contains everything you need to know to use the OpenTelemetry Javascript Tracing API when running in Node:

* **Initialization:** How to start and shutdown cleanly.
* **Tracer methods:** getTracer, getCurrentSpan, startSpan, and withSpan.
* **Span methods:** setAttribute, addEvent, recordException, setStatus, and end.

This example uses [OpenTelemetry JS v0.12](https://github.com/open-telemetry/opentelemetry-js/tree/v0.12.0) and  Lightstep as the backend. It contains heavily commented examples of every pattern needed to trace your code with OpenTelemetry.

**Relevant handy links:**
* [Free Lightstep Community Account](https://app.lightstep.com/signup/developer?signup_source=otelnodebasics): make a free account if you don't already have one, or modify the setup instructions to match your analysis tool of choice.
* OTel Node Launcher: https://github.com/lightstep/otel-launcher-node/
* Quickstart Guide: https://opentelemetry.lightstep.com/js

## Installation

```
npm i express
npm i lightstep-opentelemetry-launcher-node
```

Since we’re connecting to Lightstep, we’re using the Lightstep Distro of OpenTelemetry, the OpenTelemetry Launchers. If you're interested in details about Distros, you can read about their origins [here](https://medium.com/@tedsuo/opentelemetry-launchers-what-they-solve-and-why-we-need-them-15fc38d022a).

I also recommend turning on the debug logs, to get a sense of what OpenTelemetry is doing.

```
export OTEL_LOG_LEVEL=debug
```

## Configuration
The only required configuration to set your **access token**. You can find it under "settings" in your lightstep account. Hit the copy button, then open server_init.js and client_init.js and paste that giant thing where it says <ACCESS TOKEN>

## Running
Run the traced entry points in two terminals:
```
node server_init.js
```

```
node client_init.js
```
