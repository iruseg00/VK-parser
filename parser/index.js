require("dotenv").config();
const EpicGames = require('./sites/epic_games/EpicGames');
const Cybersport = require('./sites/cybersport/Cybersport');
const Playground = require('./sites/playground/Playground');
const Crackwatch = require('./sites/crackwatch/Crackwatch');
const CrackwatchService = require('./services/CrackwatchService');
const logger = require('./logs/log');
const Sequelize = require('./db/config/connect');
const Posts = require('./db/models/Posts');
const app = require('./app');

var timer = 
{
  "development" : 10000 ,
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

  // CrackwatchService.AddTracking('https://crackwatch.com/game/red-dead-redemption-2');
  // CrackwatchService.AddTracking('https://crackwatch.com/game/dragon-ball-z-kakarot');
  // CrackwatchService.AddTracking('https://crackwatch.com/game/zombie-army-4-dead-war');
  // CrackwatchService.AddTracking('https://crackwatch.com/game/doom-eternal');
  CrackwatchService.GetStatus('https://crackwatch.com/game/doom-eternal').then(res=>console.log(res));
  // CrackwatchService.AddTracking('https://crackwatch.com/game/resident-evil-3-remake');
  setTimeout(()=>
  {
    //Crackwatch();
    // Cybersport();
    // EpicGames();
    // Playground();
  }, time);
} 
catch (error) 
{
  logger.error('error in index.js or inside , error: ' + error);
}
