# homebridge-http-mqtt-motion
[![npm](https://img.shields.io/npm/v/homebridge-http-mqtt-motion) ![npm](https://img.shields.io/npm/dt/homebridge-http-mqtt-motion)](https://www.npmjs.com/package/homebridge-http-mqtt-motion)

# As of version 2.3.0, homebridge-camera-ffmpeg natively supports HTTP-based automation, so this is no longer needed.

This plugin allows HTTP requests to trigger [homebridge-camera-ffmpeg](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg) motion alerts.

Note that this plugin itself does not expose any devices to HomeKit.

### Installation
1. Install Homebridge using the [official instructions](https://github.com/homebridge/homebridge/wiki).
2. Install homebridge-camera-ffmpeg using `sudo npm install -g homebridge-camera-ffmpeg --unsafe-perm`.
3. Install this plugin using `sudo npm install -g homebridge-http-mqtt-motion`.
4. Update your configuration file. See configuration sample below.

### Usage
Make an HTTP request to the server with the path starting as either `motion` or `reset` to trigger or clear the motion respectively, and the next segment of the path being your URL encoded camera name, as configured in homebridge-camera-ffmpeg.

`http://raspberrypi.local:8080/motion/Cat%20%Food%20Camera` will send a motion alert to the camera 'Cat Food Camera'.

`http://raspberrypi.local:8080/reset/Cat%20%Food%20Camera` will clear the motion alert to the camera 'Cat Food Camera'.

### Configuration
Edit your `config.json` accordingly. Configuration sample:
 ```
    "platforms": [
        {
            "platform": "httpMqttMotion",
            "mqtt_server": "10.0.1.190",
            "mqtt_port": 1883,
            "mqtt_topic": "homebridge/motion",
            "http_port": 8080
        }
    ]
```

| Fields               | Description                                                                             | Required |
|----------------------|-----------------------------------------------------------------------------------------|----------|
| platform             | Must always be `httpMqttMotion`.                                                        | Yes      |
| mqtt_server          | The address of your MQTT server. (Default: 127.0.0.1)                                   | No       |
| mqtt_port            | The port of your MQTT server. (Default: 1883)                                           | No       |
| mqtt_topic           | MQTT topic that homebridge-camera-ffmpeg is subscribed to. (Default: homebridge/motion) | No       |
| http_port            | The port to listen to HTTP requests on. (Default: 8080)                                 | No       |
