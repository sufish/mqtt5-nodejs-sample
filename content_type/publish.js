const mqtt = require("mqtt");
const subscriber = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
});

subscriber.on("connect", (connack) => {
    console.log(`subscriber reason code: ${connack.reasonCode}`)
    subscriber.subscribe("mqtt5-sample/topic2")
})

subscriber.on("message", (topic, payload, packet) => {
    console.log(`received: ${payload}, formatIndicator: ${packet.properties.payloadFormatIndicator}, contentType: ${packet.properties.contentType}`)
})



setTimeout((topic, message) => {
    const publisher = mqtt.connect("mqtt://broker.emqx.io", {
        protocolVersion: 5,
    });
    publisher.on("connect", (connack) => {
        console.log(`publisher reason code: ${connack.reasonCode}`)
        publisher.publish("mqtt5-sample/topic2", "test", {
            qos: 1,
            properties:{
                payloadFormatIndicator: true,
                contentType: "String"
            }
        })
    });
}, 2000)