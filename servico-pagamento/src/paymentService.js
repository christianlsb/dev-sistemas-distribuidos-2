const { connect } = require('./rabbitmq');
const { Client } = require('pg');

const dbClient = new Client({
    user: 'user',
    host: 'postgres',
    database: 'pagamentodb',
    password: 'password',
    port: 5432,
});
dbClient.connect();

async function createTableIfNotExists() {
    const query = `
    CREATE TABLE IF NOT EXISTS transacoes (
      id SERIAL PRIMARY KEY,
      userId VARCHAR(50),
      amount DECIMAL,
      status VARCHAR(20)
    )
  `;
    await dbClient.query(query);
}

createTableIfNotExists();

async function handlePaymentRequest(req, res) {
    const { userId, amount } = req.body;
    const transaction = { userId, amount, status: 'pendente' };

    await dbClient.query(
        'INSERT INTO transacoes (userId, amount, status) VALUES ($1, $2, $3)',
        [userId, amount, 'pendente']
    );

    const channel = await connect();
    channel.sendToQueue('notificacoes', Buffer.from(JSON.stringify({ type: 'transacao-pendente', userId })));

    setTimeout(async () => {
        await dbClient.query('UPDATE transacoes SET status = $1 WHERE userId = $2', ['sucesso', userId]);
        channel.sendToQueue('notificacoes', Buffer.from(JSON.stringify({ type: 'transacao-sucesso', userId })));
    }, 5000);

    res.status(200).send({ message: 'Pagamento processado', transaction });
}

module.exports = { handlePaymentRequest };
