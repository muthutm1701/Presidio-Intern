
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    'social_analytics_db',      
    'postgres',   
    'muthu12345',   
    {
        host: 'localhost',
        dialect: 'postgres', 
        logging: false,      
    }
);

module.exports = sequelize;