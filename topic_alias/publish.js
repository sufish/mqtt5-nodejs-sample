const mqtt = require("mqtt");
const subscriber = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
});

subscriber.on("connect", (connack) => {
    console.log(`subscriber reason code: ${connack.reasonCode}`)
    subscriber.subscribe("mqtt5-sample/topic3")
})

subscriber.on("message", (topic, payload) => {
    console.log(`received: ${payload} from ${topic}`)
})


setTimeout((topic, message) => {
    const publisher = mqtt.connect("mqtt://broker.emqx.io", {
        protocolVersion: 5,
    });
    publisher.on("connect", (connack) => {
        console.log(`publisher reason code: ${connack.reasonCode}`)
        publisher.publish("mqtt5-sample/topic3", "message1", {
            properties: {
                topicAlias: 10
            }
        })
        publisher.publish("", "message2", {
            properties: {
                topicAlias: 10
            }
        })
    });
}, 2000)