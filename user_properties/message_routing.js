const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
});
client.on("connect", (connack) => {
    console.log(`reason code: ${connack.reasonCode}`)
});

client.publish("topic1", "data1", {
    properties: {
        userProperties: {
            route_to: "live-stream"
        },
    },
})

client.publish("topic2", "data2", {
    properties: {
        userProperties: {
            route_to: "storage"
        },
    },
})