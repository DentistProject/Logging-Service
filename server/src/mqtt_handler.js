const mqtt = require('mqtt');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'ssl://06c9231f22d4457abe0282a4302eda82.s2.eu.hivemq.cloud:8883';
    this.username = 'toothcheck'; // mqtt credentials if these are needed to connect
    this.password = '5vuiygrR6vygB!';
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('#', { qos: 0 });

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log(message.toString());


    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);

    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish('mytopic', message);
  }
}

module.exports = MqttHandler;