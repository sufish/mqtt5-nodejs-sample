const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
});
client.on("connect", (connack) => {
    console.log(`reason code: ${connack.reasonCode}`)
});

client.publish("topic/file", "FILE CONTENT", {
    properties: {
        userProperties: {
            filename: 'file1',
            fileLength: 100,
        },
    },
})