const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const logger = require('./config/logger'); 
const userRoutes = require('./routes/userRoutes'); 
dotenv.config({ path: './.env' });

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.originalUrl}`);
    next();
});

mongoose.connect(process.env.MONGO_URI)

app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});