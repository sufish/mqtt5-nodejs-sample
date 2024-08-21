const mqtt = require("mqtt");
const publisher = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
});

const topic = "mqtt5sample/topic4";
publisher.on("connect", packet => {
    console.log(`publisher reason code ${packet.reasonCode}`)
    publisher.publish(topic, "message1", {retain: true})
})

const subscriber1 = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5
})

subscriber1.on("message", (topic, payload, packet) =>{
    console.log(`subscriber1 received ${payload}, retain ${packet.retain}`)
})

const subscriber2 = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
});

subscriber2.on("message", (topic, payload, packet) =>{
    console.log(`subscriber2 received ${payload}, retain ${packet.retain}`)
})
const subscriber3 = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
});

subscriber3.on("message", (topic, payload, packet) =>{
    console.log(`subscriber3 received ${payload}, retain ${packet.retain}`)
})

setTimeout(()=>{
    subscriber1.subscribe(topic, {rh: 0})
    subscriber2.subscribe(topic, {rh: 1})
    subscriber3.subscribe(topic, {rh: 2})
    subscriber1.subscribe(topic, {rh: 0, qos: 1})
    subscriber2.subscribe(topic, {rh: 1, qos: 1})
    subscriber3.subscribe(topic, {rh: 2, qos: 1})
}, 2000)