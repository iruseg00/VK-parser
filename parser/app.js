const express = require("express");
const CrackwatchController = require('./controllers/CrackwatchController');
const {logger} = require('./logs/log');

const app = express();
const PORT = 33133;

try 
{
    var server = app.listen(PORT, err => 
    {
        if (err) console.error(err);
    });
        
    app.use("/api/crackwatch", CrackwatchController);
        
    server.setTimeout(3000000); 
    
    logger.info(`Server runing on PORT: ${PORT}`);    
} 
catch (error) 
{
    logger.error('error in app.js , error: ' + error);
}

module.exports = app;