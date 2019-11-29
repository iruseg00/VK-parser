const Cybersport = require('./sites/cybersport/Cybersport');
const Sequelize = require('./db/config/connect');
const Posts = require('./db/models/Posts');

var time = 60000;

Sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });


setInterval(()=>
{
    Cybersport();
    time = 900000;
}, time);
