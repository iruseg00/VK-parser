const Sequelize = require('sequelize');

var env = process.env.NODE_ENV || "development";
var config = require("./config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "postgres",
    pool:
    {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  module.exports = sequelize;