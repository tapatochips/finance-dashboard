const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// Routes

app.use('/api/transactions', transactionRoutes);

app.listen(5000, () => console.log('listening on 5000'))