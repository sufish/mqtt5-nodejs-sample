const mqtt = require("mqtt");
const subscriber = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5
});

subscriber.on("connect", (connack) => {
    console.log(`subscriber reason code ${connack.reasonCode}`)
    if (connack.sessionPresent === false) {
        subscriber.subscribe("mqtt5sample/topic1", {
            properties: {
                subscriptionIdentifier: 1
            }
        })

        subscriber.subscribe("mqtt5sample/topic2/+", {
            properties: {
                subscriptionIdentifier: 2
            }
        })
    }
})

subscriber.on("message", (topic, payload, packet) => {
    if (packet.properties.subscriptionIdentifier === 1) {
        console.log(`handle ${payload} in the first branch`)
    } else if (packet.properties.subscriptionIdentifier === 2) {
        console.log(`handle ${payload} in the second branch`)
    }
})

setTimeout(() => {
    const publisher = mqtt.connect("mqtt://broker.emqx.io", {
        protocolVersion: 5
    });
    publisher.on("connect", (connack) => {
        console.log(`publisher reason code ${connack.reasonCode}`)
        publisher.publish("mqtt5sample/topic1", "message1")
        publisher.publish("mqtt5sample/topic2/test", "message2")
    })
}, 2000)