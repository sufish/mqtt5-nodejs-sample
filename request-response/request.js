const mqtt = require("mqtt");
const responder = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5
});

responder.on("connect", (connack) => {
    console.log(`responder reason code ${connack.reasonCode}`)
    responder.subscribe("topic/request")
})

responder.on("message", (topic, payload, packet) => {
    console.log(`receive request ${payload}`)
    if (packet.properties.responseTopic != null) {
        responder.publish(packet.properties.responseTopic, "this is response", {
            qos: 1,
            properties: {
                correlationData: packet.properties.correlationData
            }
        })
    }
})

setTimeout(() => {
    const requester = mqtt.connect("mqtt://broker.emqx.io", {
        protocolVersion: 5,
        clientId: "mqtt5-sample-8"
    });
    let responseTopic = "topic/response/mqtt5-sample-8"
    requester.on("connect", (connack) => {
        console.log(`requester reason code ${connack.reasonCode}`)
        requester.subscribe(responseTopic)
        requester.publish("topic/request", "this is request", {
            qos: 1,
            properties: {
                responseTopic: responseTopic,
                correlationData: Buffer.from("111")
            }
        })
    })
    requester.on("message", (topic, payload, packet) => {
        console.log(`receive response: ${payload}, ${packet.properties.correlationData}`)
    })
}, 2000)