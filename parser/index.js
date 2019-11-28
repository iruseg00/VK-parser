const Cybersport = require('./sites/cybersport/Cybersport');
const Sequelize = require('./db/config/connect');
const Posts = require('./db/models/Posts');

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
}, 900000);
