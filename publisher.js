'use strict'

const amqp = require('amqplib')
const queue = 'cola1'

async function publisher() {
    try {const connection = await amqp.connect('amqp://guest:guest@10.6.101.93')
    const channel = await connection.createChannel()

    await channel.assertQueue(queue);

    const message = 'Mensaje desde node';

    await channel.sendToQueue(
            queue,
            Buffer.from(message));
    console.log("mensaje enviado")
    await channel.close();
    await connection.close();
    } catch (error){
        console.log(error);
    }
}

publisher()

