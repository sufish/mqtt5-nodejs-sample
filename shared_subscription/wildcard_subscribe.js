const mqtt = require("mqtt");
const subscriber1 = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
});
const subscriber2 = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
});

subscriber1.on("connect", () =>{
    subscriber1.subscribe("$share/group1/2ndfloor/+")
})

subscriber1.on("message", (topic, payload) =>{
    console.log(`subscriber1: ${topic}, ${payload}`)
})

subscriber2.on("connect", () =>{
    subscriber2.subscribe("$share/group1/2ndfloor/+")
})

subscriber2.on("message", (topic, payload) =>{
    console.log(`subscriber2: ${topic}, ${payload}`)
})

setTimeout(()=>{
    const publisher = mqtt.connect("mqtt://broker.emqx.io", {
        protocolVersion: 5,
    });
    publisher.on("connect", ()=>{
        publisher.publish("2ndfloor/room1", "message1")
        publisher.publish("2ndfloor/room2", "message2")
    })
}, 2000)