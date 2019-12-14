require("dotenv").config();
const EpicGames = require('./sites/epic_games/EpicGames');
const Cybersport = require('./sites/cybersport/Cybersport');
const logger = require('./logs/log');
const Sequelize = require('./db/config/connect');
const Posts = require('./db/models/Posts');

var timer = 
{
  "development" : 20000 ,
  "production"  : 900000
};

try 
{
  var env = process.env.NODE_ENV || "development";
  var time = timer[env];

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


  setInterval(()=>
  {
    Cybersport();
    EpicGames();
  }, time);
} 
catch (error) 
{
  logger.error('error in index.js or inside , error: ' + error);
}
