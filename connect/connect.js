const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
    clientId: ""
});
client.on("connect", (connack) => {
    console.log(`reason code: ${connack.reasonCode}`)
    console.log(connack.properties)
});