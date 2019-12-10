const Sequelize = require('sequelize');
const sequelize = require ('../config/connect');

var Posts = sequelize.define(
  'Posts',
  {
    id: 
    {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    type: 
    {
      type: Sequelize.STRING,
      allowNull: true
    },
    topic: 
    {
      type: Sequelize.TEXT,
      allowNull: true
    },
    description: 
    {
      type: Sequelize.TEXT,
      get: function() 
      {
        return JSON.parse(this.getDataValue('description'));
      }, 
      set: function(val) 
      {
        return this.setDataValue('description', JSON.stringify(val));
      },
      allowNull: false
    },
    linksPhoto: 
      {
        type: Sequelize.TEXT,
        get: function() 
        {
          return JSON.parse(this.getDataValue('linksPhoto'));
        }, 
        set: function(val) 
        {
          return this.setDataValue('linksPhoto', JSON.stringify(val));
        },
        allowNull: true
      },
    timeUTC: 
    {
      type: Sequelize.DATE,
      allowNull: true
    },
    link: 
    {
      type: Sequelize.STRING,
      allowNull: true
    },
    site: 
    {
      type: Sequelize.STRING,
      allowNull: true
    },  
  });
  
  Posts.sync({force: false})

  module.exports = Posts;