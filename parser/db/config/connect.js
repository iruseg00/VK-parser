const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'template1', 
  'postgres', 
  'trytofindme', 
  {
    host: '0.0.0.0',
    dialect: 'postgres',
    pool:
    {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  module.exports = sequelize;