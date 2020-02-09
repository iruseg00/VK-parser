const Sequelize = require('sequelize');
const sequelize = require ('../config/connect');

var TrackingCrackwatch = sequelize.define(
  'TrackingCrackwatch',
  {
    id: 
    {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    status: 
    {
      type: Sequelize.STRING,
      allowNull: false
    },
    link: 
    {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
  
  TrackingCrackwatch.sync({force: false})

  module.exports = TrackingCrackwatch;