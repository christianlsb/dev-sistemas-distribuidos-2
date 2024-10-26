const amqp = require('amqplib');

async function connect() {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    await channel.assertQueue('notificacoes');
    return channel;
}

module.exports = { connect };
