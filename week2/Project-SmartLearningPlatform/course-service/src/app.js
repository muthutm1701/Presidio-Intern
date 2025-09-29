const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes');
const checkApiKey = require('./middleware/checkApiKey');
const { protect, authorize } = require('./middleware/authMiddleware');

dotenv.config({ path: './.env' });
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Course DB Connected...'))
  .catch(err => console.error(err));
  
app.use('/courses', courseRoutes);
app.get('/analytics', checkApiKey, protect, authorize('admin'), (req, res) => {
    res.json({
        message: 'Welcome Admin! here are the required analytics',
        data: {
            totalCourses: 150, 
            activeStudents: 2345,
        }
    });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Course Service running on port ${PORT}`);
});
