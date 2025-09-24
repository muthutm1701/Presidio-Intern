const express = require('express');
const db = require('./models');
const { getTrendingHashtags} = require('./src/hashtagMethods');
const { analyzeComments } = require('./src/commentMethods');
const app = express();
const PORT =  3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('social media analytics api');
});
const analyticsRouter = express.Router();
analyticsRouter.get('/trending-hashtags', async (req, res) => {
    try {

        const trends = await getTrendingHashtags();
        res.json(trends);
    } catch (error) {
        console.error('Error fetching trending hashtags:', error);
        res.status(500).json({ error: ' error occurred.' });
    }
});

analyticsRouter.get('/post/:id/comments', async (req, res) => {
    try {
        const postId = parseInt(req.params.id, 10); 
        if (isNaN(postId)) {
            return res.status(400).json({ error: 'Invalid Post ID' });
        }
        const analysis = await analyzeComments(postId);
        res.json(analysis);
    } catch (error) {
        console.error(`Error t ${req.params.id}:`, error);
        res.status(500).json({ error: ' error occurred.' });
    }
});
app.use('/analytics', analyticsRouter);
async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log('Database connection has been established successfully.');
          await db.sequelize.sync({ force: true });
        app.listen(PORT, () => {
            console.log(`Server is running on port :${PORT}`);
        });
    } catch (error) {

        console.error(' database issue:', error);
    }
}
startServer();

