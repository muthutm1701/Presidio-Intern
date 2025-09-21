const { Hashtag, Post, sequelize } = require('../models');
const { Op } = require('sequelize'); 

async function getTrendingHashtags() {
    const trends = await Hashtag.findAll({
        attributes: [
            'tagName',
            [sequelize.fn('COUNT', sequelize.col('Posts.id')), 'count']
        ],
        include: [{ model: Post, attributes: [] }],
        group: ['Hashtag.id'],
        order: [[sequelize.col('count'), 'DESC']]
    });
    return trends.map(t => t.get({ plain: true }));
}


module.exports = { getTrendingHashtags };