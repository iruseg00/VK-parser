require("dotenv").config();
const EpicGames = require('./sites/epic_games/EpicGames');
const Cybersport = require('./sites/cybersport/Cybersport');
const Playground = require('./sites/playground/Playground');
const logger = require('./logs/log');
const Sequelize = require('./db/config/connect');
const Posts = require('./db/models/Posts');

var timer = 
{
  "development" : 30000 ,
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
    // Cybersport();
    EpicGames();
    Playground();
  }, time);
} 
catch (error) 
{
  logger.error('error in index.js or inside , error: ' + error);
}
