require("dotenv").config();
const EpicGames = require('./sites/epic_games/EpicGames');
const Cybersport = require('./sites/cybersport/Cybersport');
const Playground = require('./sites/playground/Playground');
const Crackwatch = require('./sites/crackwatch/Crackwatch');
const logger = require('./logs/log');
const Sequelize = require('./db/config/connect');
const app = require('./app');
const Service = require('./services/PlaygroundService');

var timer = 
{
  "development" : 20000 ,
  "production"  : 900000
};

try 
{
  var env = process.env.NODE_ENV || "development";

  Sequelize
    .authenticate()
    .then(() => 
    {
      logger.info("Connection has been established successfully");
    })
    .catch(error => 
    {
      logger.error("Unable to connect to the database: " + error);
    });

  setTimeout(()=>
  {
    Crackwatch();
    Cybersport();
    EpicGames();
    Playground();
  }, timer[env]);
} 
catch (error) 
{
  logger.error('error in index.js or inside , error: ' + error);
}
