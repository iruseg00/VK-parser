require("dotenv").config();
const Cybersport = require('./sites/cybersport/Cybersport');
const logger = require('./logs/log');
const Sequelize = require('./db/config/connect');
const Posts = require('./db/models/Posts');

var timer = 
{
  "development" : 50000 ,
  "production"  : 90000
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
  }, time);
} 
catch (error) 
{
  logger.error('error in index.js or inside , error: ' + error);
}
