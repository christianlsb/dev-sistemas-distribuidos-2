const express = require('express');
const paymentService = require('./paymentService');

const app = express();
app.use(express.json());

app.post('/pagar', paymentService.handlePaymentRequest);
//hello world
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serviço de pagamento rodando na porta ${PORT}`);
});