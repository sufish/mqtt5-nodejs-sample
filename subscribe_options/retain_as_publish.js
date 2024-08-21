const mqtt = require("mqtt");
const subscriber1 = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
});
const subscriber2 = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
});

subscriber1.on("connect", packet => {
    console.log(`subscriber1 reason code ${packet.reasonCode}`)
    subscriber1.subscribe("mqtt5sample/topic1", {
        rap: false
    })
})

subscriber1.on("message", (topic, payload, packet) => {
    console.log(`subscriber1 received ${payload}, retain ${packet.retain}`)
})

subscriber2.on("message", (topic, payload, packet) => {
    console.log(`subscriber2 received ${payload}, retain ${packet.retain}`)
})

subscriber2.on("connect", packet => {
    console.log(`subscriber2 reason code ${packet.reasonCode}`)
    subscriber2.subscribe("mqtt5sample/topic1", {
        rap: true
    })
})
setTimeout(() => {
    const publisher = mqtt.connect("mqtt://broker.emqx.io", {
        protocolVersion: 5,
    });
    publisher.on("connect", packet => {
        console.log(`publisher reason code ${packet.reasonCode}`)
        publisher.publish("mqtt5sample/topic1", "message1", {
            retain: true
        })
    })
}, 2000)
