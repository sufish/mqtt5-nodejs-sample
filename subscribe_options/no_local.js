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
        nl: false
    })
})

subscriber1.on("message", (topic, payload) =>{
    console.log(`subscriber1 received ${payload}`)
})

subscriber2.on("message", (topic, payload) =>{
    console.log(`subscriber2 received ${payload}`)
})

subscriber2.on("connect", packet => {
    console.log(`subscriber2 reason code ${packet.reasonCode}`)
    subscriber2.subscribe("mqtt5sample/topic2", {
        nl: true
    })
})
setTimeout(()=>{
    subscriber1.publish("mqtt5sample/topic1", "message1")
    subscriber2.publish("mqtt5sample/topic2", "message2")
}, 2000)
