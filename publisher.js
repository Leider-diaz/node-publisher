const express = require('express');
const app = express();
const port = 3000;

const amqp = require('amqplib')
const queue = 'cola5'
// Middleware para parsear JSON
app.use(express.json());

// Endpoint de ejemplo para obtener datos
app.get('/api/data', (req, res) => {
    publisher();
  res.json({ message: 'mensaje enviado' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });

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

