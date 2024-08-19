const mqtt = require("mqtt");
const publisher = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
    clientId: "mqtt5-sample-6",
});

publisher.on("connect", (connack) => {
    console.log(`Reason code: ${connack.reasonCode}`)
    publisher.publish("mqtt5-sample/topic1", "message1", {
        qos: 1,
        properties: {
            messageExpiryInterval: 10
        }
    }, (error, packet) =>{
        console.log("publish" + error)
    })

    publisher.publish("mqtt5-sample/topic1", "message2", {
        qos: 1,
        properties: {
            messageExpiryInterval: 1
        }
    })
});