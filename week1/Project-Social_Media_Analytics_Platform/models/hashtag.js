const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hashtag = sequelize.define('Hashtag', {
    tagName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'tag_name'
    }
}, {
    tableName: 'hashtags',
    timestamps: false
});

module.exports = Hashtag;
