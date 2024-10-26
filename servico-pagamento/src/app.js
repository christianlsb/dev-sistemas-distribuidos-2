const express = require('express');
const paymentService = require('./paymentService');

const app = express();
app.use(express.json());

app.post('/pagar', paymentService.handlePaymentRequest);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serviço de pagamento rodando na porta ${PORT}`);
});