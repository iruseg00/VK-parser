const Distributions = require("../db/models/Distributions");

class DistributionsService 
{
  
  getAll() 
  {
    return Distributions.findAll({});
  }
    
  create(body) 
  {
    return Distributions.findOrCreate({
      where: {
        link: body.link
      },
      defaults: {
        topic: body.topic ,
        timeStart: body.timeUTC[0] ,
        timeEnd: body.timeUTC[1] ,
        site: body.site ,
        linksPhoto: body.linksPhoto ,
        link: body.link ,
      }
      });
    }
  }
  
module.exports = new DistributionsService();