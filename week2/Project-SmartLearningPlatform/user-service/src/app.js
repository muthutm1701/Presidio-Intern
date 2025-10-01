const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const logger = require('./config/logger'); 
dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.originalUrl}`);
    next();
});

mongoose.connect(process.env.MONGO_URI)

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});