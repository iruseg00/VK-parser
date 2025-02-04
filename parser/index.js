require("dotenv").config();
const EpicGames = require('./sites/epic_games/EpicGames');
const Cybersport = require('./sites/cybersport/Cybersport');
const Playground = require('./sites/playground/Playground');
const Crackwatch = require('./sites/crackwatch/Crackwatch');
const { logger , memory , workTime } = require('./logs/log');
const Sequelize = require('./db/config/connect');
const app = require('./app');

var timer = 
{
  "development" : 10000 ,
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
    
  setInterval(()=>
  {
    workTime.info('---start---');
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
finally
{
  memory.info(`index.js \n` + 
              `rss       : ${process.memoryUsage().rss / 1048576}  MB\n` + 
              `Total Heap: ${process.memoryUsage().heapTotal / 1048576}  MB\n` + 
              `Used Heap : ${process.memoryUsage().heapUsed / 1048576} MB\n` + 
              `PPID      : ${process.ppid}\n` + 
              `PID       : ${process.pid}\n`);
}
