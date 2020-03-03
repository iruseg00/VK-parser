const {logger} = require('../logs/log');
const express = require("express");
const router = express.Router();
const CrackwatchService = require('../services/CrackwatchService');

router.post("/add", (req, res) =>     
{
  logger.info('post log')
  JSON.stringify(req.body).then((data)=> logger.info(data))
  CrackwatchService.AddTracking(req.body.link)
    .then(data => 
    {
      if (!data) throw new Error("Error in CrackwatchController.js , can not get data by method CrackwatchService.AddTracking()");
      res.status(200);
    })
    .catch(err => {
      res.status(400).json(err.message);
      logger.error('error in CrackwatchController.js , error: ' + err);
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
      logger.error('error in CrackwatchController.js , error: ' + err);
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
      logger.error('error in CrackwatchController.js , error: ' + err);
    });
});

router.post("/get_status", (req, res) => 
{
  CrackwatchService.GetStatus(req.body.link)
    .then(data => 
    {
      if (data === null) throw new Error("Error , method CrackwatchService.GetStatus() return 'null'.");
      res.status(200).json(data.dataValues.status);
    })
    .catch(err => {
      res.status(400).json(err.message);
      logger.error('error in CrackwatchController.js , error: ' + err);
    });
});

router.post("/get_unreleased", (req, res) => 
{
  CrackwatchService.GetAllUnreleased()
    .then(data => 
    {
      if (!data) throw new Error("Error , method CrackwatchService.GetAllUnreleased() return 'null'.");
      var links = [];
      for(let i = 0; i < data.length ; i++)
        links.push(data[i].dataValues.link);
      res.status(200).json(links);
    })
    .catch(err => {
      res.status(400).json(err.message);
      logger.error('error in CrackwatchController.js , error: ' + err);
    });
});

router.post("/get_uncracked", (req, res) => 
{
  CrackwatchService.GetAllUncracked()
    .then(data => 
    {
      if (!data) throw new Error("Error , method CrackwatchService.GetAllUncracked() return 'null'.");
      var links = [];
      for(let i = 0; i < data.length ; i++)
        links.push(data[i].dataValues.link);
      res.status(200).json(links);
    })
    .catch(err => {
      res.status(400).json(err.message);
      logger.error('error in CrackwatchController.js , error: ' + err);
    });
});

router.post("/get_cracked", (req, res) => 
{
  CrackwatchService.GetAllCracked()
    .then(data => 
    {
      if (!data) throw new Error("Error , method CrackwatchService.GetAllCracked() return 'null'.");
      var links = [];
      for(let i = 0; i < data.length ; i++)
        links.push(data[i].dataValues.link);
      res.status(200).json(links);
    })
    .catch(err => {
      res.status(400).json(err.message);
      logger.error('error in CrackwatchController.js , error: ' + err);
    });
});
  
router.post("/get_un_ed", (req, res) => 
{
  CrackwatchService.GetAllUncrackedAndUnreleased()
    .then(data => 
    {
      if (!data) throw new Error("Error , method CrackwatchService.GetAllUncrackedAndUnreleased() return 'null'.");
      var values = [];
      for(let i = 0; i < data.length ; i++)
        values.push( { link : data[i].dataValues.link , status : data[i].dataValues.status } );
      res.status(200).json(values);
    })
    .catch(err => {
      res.status(400).json(err.message);
      logger.error('error in CrackwatchController.js , error: ' + err);
    });
});

module.exports = router;
