const http = require('http');
const mqtt = require('mqtt');

module.exports = function(homebridge) {
    homebridge.registerPlatform("homebridge-http-mqtt-motion", "httpMqttMotion", dafangMqtt, true);
}

function dafangMqtt(log, config, api) {
    this.log = log;

    const mqttServer = config.mqtt_server || '127.0.0.1';
    const mqttPort = config.mqtt_port || '1883';
    this.mqttUrl = 'mqtt://' + mqttServer + ':' + mqttPort;

    this.mqttTopic = config.mqtt_topic || 'homebridge/motion';
    this.httpPort = config.httpPort || '8080';

    if (api) {
        api.on('didFinishLaunching', this.connectMqtt.bind(this));
    }
}

dafangMqtt.prototype.connectMqtt = function connectMqtt() {
    const client = mqtt.connect(this.mqttUrl);
    client.on('connect', () => {
    	this.log('MQTT Connection Opened');
    });

    const server = http.createServer((req, res) => {
    	this.log.debug('Received HTTP Path - ' + req.url);
    	var path = req.url.split('/');
    	if (path.length >= 2 ) {
    		var camera = decodeURIComponent(path[2]);
    		if (path[1] == 'motion') {
				this.log.debug('Publishing MQTT Message - ' + this.mqttTopic + ': ' + camera);
				client.publish(this.mqttTopic, camera);
    		} else if (path[1] == 'reset') {
				this.log.debug('Publishing MQTT Message - ' + this.mqttTopic + '/reset: ' + camera);
				client.publish(this.mqttTopic + '/reset', camera);
    		}
    	}
		res.writeHead(200);
		res.end();
    });
    
    this.log('Starting HTTP Server on Port', this.httpPort);
    server.listen(this.httpPort);
}