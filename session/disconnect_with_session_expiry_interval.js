const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
    clean: false,
    clientId: "mqtt5-sample-5",
    properties:{
        sessionExpiryInterval: 5
    }
});
client.on("connect", (connack) => {
    console.log(`reason code: ${connack.reasonCode}, session present: ${connack.sessionPresent}`)
    client.end({
        properties: {
            sessionExpiryInterval: 0
        }
    })
});

setTimeout(()=>{
    client.connect()
}, 2000)