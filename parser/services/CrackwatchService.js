const TrackingCrackwatch = require("../db/models/TrackingCrackwatch");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class CrackwatchService
{
  getAll() 
  {
    return TrackingCrackwatch.findAll({});
  }

  GetAllUncrackedAndUnreleased()
  {
    return TrackingCrackwatch.findAll({
      where: {
        [Op.or]: [ 
          { status: "UNCRACKED" } , 
          { status: "UNRELEASED" } 
        ]
      }
    });
  }

  GetAllUncracked()
  {
    return TrackingCrackwatch.findAll({
      where: {
        status: "UNCRACKED"
      }
    });
  }

  GetAllCracked()
  {
    return TrackingCrackwatch.findAll({
      where: {
        status: "CRACKED"
      }
    });;
  }

  GetAllUnreleased()
  {
    return TrackingCrackwatch.findAll({
      where: {
        status: "UNRELEASED"
      }
    });
  }

  GetStatus(link)
  {
    return TrackingCrackwatch.findOne({
      where:{
        link
      }
    }).dataValues.status;
  }

  AddTracking(link)
  {
    return TrackingCrackwatch.findOrCreate({
      where: 
      {
        link
      },
      defaults: 
      {
        status: "UNCRACKED" 
      }
    });
  }

  DeleteTracking(link)
  {
    return TrackingCrackwatch.destroy({
      where:
      {
        link
      }
    })
  }

  Update(status , link)
  {
    return TrackingCrackwatch.update({status} ,{
      where:
      {
        link
      }
    })
  }
}
  
module.exports = new CrackwatchService();
