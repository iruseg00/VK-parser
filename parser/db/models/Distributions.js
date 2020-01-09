const Sequelize = require('sequelize');
const sequelize = require ('../config/connect');

var Distributions = sequelize.define(
  'Distributions',
  {
    id: 
    {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    topic: 
    {
      type: Sequelize.TEXT,
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
    timeStart: 
    {
      type: Sequelize.DATE,
      allowNull: false
    },
    timeEnd: 
    {
      type: Sequelize.DATE,
      allowNull: false
    },
    link: 
    {
      type: Sequelize.STRING,
      allowNull: false
    },
    site: 
    {
      type: Sequelize.STRING,
      allowNull: false
    },  
  });
  
  Distributions.sync({force: false})

  module.exports = Distributions;