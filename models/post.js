const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Post = sequelize.define(
  'Post',
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Post.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
User.hasMany(Post, { as: 'posts', foreignKey: 'authorId' });

module.exports = Post;
