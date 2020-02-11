const Posts = require("../db/models/Posts");
const Sequelize = require("sequelize");
const moment = require('moment');

const Op = Sequelize.Op;

class CybersportService
{

  GetAllLinksOver2Week()
  {
    var date = moment().utc().set('date', moment().date() - 14);
    return Posts.findAll({
      where: 
      {
        site: "cybersport.ru"  ,
        timeUTC:  { [Op.gt]:date.format() }
      }
    })
    .then(records => 
    {
      let array = [];
      for(let i = 0; i < records.length; i++)
        array.push( records[i].dataValues.link )
      return array;  
    })
    .catch(err =>
    {
      return [];
    });
  }

}
  
module.exports = new CybersportService();
