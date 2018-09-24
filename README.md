# poc-energy-meter-web
Proof of concept energy meter dashboard

# Prerequisites

1. AWS Account - with AWS IoT MQTT service enabled.
1. Yarn or Npm
1. Build an energy sub-meter with current transformer sensors.
    1. An [ESP32 dev board](https://www.espressif.com/en/products/hardware/development-boards)
    1. PlatformIO 
    1. [CTSensor lib](https://github.com/sensidev/ct-sensor-lib)
    1. Send JSON payloads with structures like below.
    

# Payload

MQTT payload example sent directly from an ESP32 via WiFi, leveraging the power of AWS IoT shadow API.

```json
{
  "state": {
    "reported": {
      "channels": [
        {
          "id": 0,
          "energy": 0.0074430432784777017,
          "voltage": 230,
          "power": 26.794955802519727,
          "rms_min_current": 0.11649980783704229,
          "rms_avg_current": 0.11649980783704229,
          "rms_max_current": 0.11649980783704229,
          "rms_current_data_points": [
            0.11649980783704229
          ]
        },
        {
          "id": 1,
          "energy": 0.0056770816631960394,
          "voltage": 230,
          "power": 20.437493987505743,
          "rms_min_current": 0.088858669510894536,
          "rms_avg_current": 0.088858669510894536,
          "rms_max_current": 0.088858669510894536,
          "rms_current_data_points": [
            0.088858669510894536
          ]
        }
      ]
    }
  }
}
```

# Client

```
cd client
yarn install 
```

```
yarn start
```

# Server

```
cd server
yarn install
```

## Mock Server

```
yarn start_mock
```

## MQTT Server

```
yarn start_mqtt -- -f certs -H <your-end-point>.iot.<your-region>.amazonaws.com
```

# Devops

You can deploy this on your own server using Nginx & Supervisor. Check out the `devops` folder with config examples.

# SSL certificates

Use letsencrypt for this. E.g. But first make sure you have the `.well-known` folder in place.

```
letsencrypt certonly --webroot -w /www/subdomain.domain.com/ -d subdomain.domain.com
```