const mqtt = require("mqtt");
const client1 = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
    clientId: "mqtt5-sample-3",
});

const client2 = mqtt.connect("mqtt://broker.emqx.io", {
    protocolVersion: 5,
    clientId: "mqtt5-sample-3",
});

client1.on("connect", (connack) => {
    if(connack.reasonCode === 0) {
        console.log(`client1 connected`)
    }
});

client1.on("disconnect", (packet) =>{
   console.log(`client1 disconnected: ${packet.reasonCode}`)
    if(packet.reasonCode === 0x8E){
        console.log("client1 id conflict, stop now")
        client1.end()
    }
})

client2.on("disconnect", (packet) =>{
    console.log(`client2 disconnected: ${packet.reasonCode}`)
    if(packet.reasonCode === 0x8E){
        console.log("client2 id conflict, stop now")
        client2.end()
    }
})

client2.on("connect", (connack) => {
    if(connack.reasonCode === 0) {
        console.log(`client2 connected`)
    }
});
