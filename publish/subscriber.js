const mqtt = require("mqtt");
const subscriber = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
    clean: false,
    clientId: "mqtt5-sample-7",
    properties:{
        sessionExpiryInterval: 800
    }
});

subscriber.on("connect", (connack) => {
    console.log(`Reason code: ${connack.reasonCode}, session present: ${connack.sessionPresent}`)
    if(connack.sessionPresent === false){
        subscriber.subscribe("mqtt5-sample/topic1", {qos: 1})
    }
})

subscriber.on("message", (topic, payload) => {
    console.log(`received: ${payload}`)
})
