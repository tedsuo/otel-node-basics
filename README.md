# OpenTelemetry Node Basics

Install the launcher:
```
npm install lightstep-opentelemetry-launcher-node --save
```

Run the traced entry points in two terminals:

```
node traced_server.js
```

```
node traced_client.js
```

Notes:
* `export OTEL_LOG_LEVEL=debug` is your friend
