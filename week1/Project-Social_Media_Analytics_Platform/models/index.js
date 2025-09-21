const sequelize = require('../config/database');
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Comment = require('./comment');
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });
Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.hasMany(Comment, { as: 'Replies', foreignKey: 'parent_comment_id' });
Comment.belongsTo(Comment, { as: 'Parent', foreignKey: 'parent_comment_id' });
Post.belongsToMany(Hashtag, { through: 'post_hashtags', foreignKey: 'post_id' });
Hashtag.belongsToMany(Post, { through: 'post_hashtags', foreignKey: 'hashtag_id' });

const db = {
    sequelize, 
    User,
    Post,
    Hashtag,
    Comment,
};

module.exports = db;