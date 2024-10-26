const express = require('express');
const notificationService = require('./notificationService');

const app = express();
app.use(express.json());

notificationService.startListening();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Serviço de notificação rodando na porta ${PORT}`);
});
