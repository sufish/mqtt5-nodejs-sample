const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
    clientId: "mqtt5-sample-1",
    will: {
        topic: "mqtt5-sample-will-1",
        payload: "i'm offline"
    }
});
client.on("connect", (connack) => {
    if(connack.reasonCode === 0) {
        console.log(`client connected`)
    }
});

const willSubscriber = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
    clientId: "mqtt5-sample-2",
});

willSubscriber.on("connect", (connack) =>{
    if(connack.reasonCode === 0){
        willSubscriber.subscribe("mqtt5-sample-will-1", (error) =>{
            if(!error){
                console.log("will topic subscribed")
            }
        })
    }
})
willSubscriber.on("message", (topic, payload) => {
    console.log(`receive from ${topic}:${payload}`)
})

setTimeout(()=>{
    client.end({
        reasonCode: 0x04
    })
}, 2000)