const { connect } = require('./rabbitmq');

async function startListening() {
    const channel = await connect();

    channel.consume('notificacoes', (msg) => {
        const notification = JSON.parse(msg.content.toString());
        if (notification.type === 'transacao-pendente') {
            console.log(`Notificação: Transação pendente para o usuário ${notification.userId}`);
        } else if (notification.type === 'transacao-sucesso') {
            console.log(`Notificação: Transação confirmada para o usuário ${notification.userId}`);
        }
        channel.ack(msg);
    });
}

module.exports = { startListening };
