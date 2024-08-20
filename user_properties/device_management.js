const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
    properties:{
        userProperties:{
            serialNo: "1234",
            region: "A1"
        }
    }
});
client.on("connect", (connack) => {
    console.log(`reason code: ${connack.reasonCode}`)
});