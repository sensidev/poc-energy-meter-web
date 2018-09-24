#!/bin/sh

export PORT=8811

exec node mqttApp -- -f certs -H <your-end-point>.iot.<your-region>.amazonaws.com