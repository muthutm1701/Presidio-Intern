const { Hashtag, Post, sequelize } = require('../models');
const { Op } = require('sequelize');

async function getTrendingHashtags() {
    const trends = await Hashtag.findAll({
        attributes: [
            'tagName',
            [sequelize.fn('COUNT', sequelize.col('Posts.id')), 'count']
        ],
        include: [{
            model: Post,
            attributes: [],
            through: { attributes: [] }
        }],
        group: ['Hashtag.id'],
        order: [[sequelize.col('count'), 'DESC']]
    });

    return trends.map(t => {
        const plainTag = t.get({ plain: true });
        return {
            ...plainTag,
            count: parseInt(plainTag.count, 10) || 0
        };
    });
}

module.exports = { getTrendingHashtags };
