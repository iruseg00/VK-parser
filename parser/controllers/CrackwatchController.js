const logger = require('../logs/log');
const express = require("express");
const router = express.Router();
const CrackwatchService = require('../services/CrackwatchService');

try 
{
  router.post("/add", (req, res) => 
  {
    CrackwatchService.AddTracking(req.body.link)
      .then(data => 
      {
        if (!data) throw new Error("Error in CrackwatchController.js , can not get data by method CrackwatchService.AddTracking()");
        res.status(200);
      })
      .catch(err => {
        res.status(400).json(err.message);
      });
  });

  router.post("/delete", (req, res) => 
  {
    CrackwatchService.DeleteTracking(req.body.link)
      .then(data => 
      {
        if (data == 0) throw new Error("Error, can not find STRING in Database. ");
        if (data != 1) throw new Error("Uncknow error, incorrect response by CrackwatchService.DeleteTracking() ");  
        res.status(200);
      })
      .catch(err => {
        res.status(400).json(err.message);
      });
  });

  router.post("/update", (req, res) => 
  {
    CrackwatchService.Update(req.body.status , req.body.link)
      .then(data => 
      {
        if (data[0] != 1) throw new Error("Error by method CrackwatchService.Update(). Update did not happen.");
        res.status(200);
      })
      .catch(err => {
        res.status(400).json(err.message);
      });
  });

  router.post("/get_status", (req, res) => 
  {
    CrackwatchService.GetStatus(req.body.link)
      .then(data => 
      {
        if (!data) throw new Error("Error , can no find link in database, please check the link is correct.");
        res.status(200);
      })
      .catch(err => {
        res.status(400).json(err.message);
      });
  });
} 
catch (error) 
{
  logger.error('error in CrackwatchController.js , error: ' + error);
}

module.exports = router;