const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
    clean: false,
    clientId: "mqtt5-sample-4",
    properties:{
        sessionExpiryInterval: 5
    }
});
client.on("connect", (connack) => {
    console.log(`reason code: ${connack.reasonCode}, session present: ${connack.sessionPresent}`)
    client.end()
});

setTimeout(()=>{
    client.connect()
}, 2000)

setTimeout(()=>{
    client.connect()
}, 8000)