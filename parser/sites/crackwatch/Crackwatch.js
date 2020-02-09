const logger = require('../../logs/log');
const extract = require('./extract');
const CrackwatchService = require('../../services/CrackwatchService');

function Crackwatch()
{
    try 
    {
        CrackwatchService.GetAllUncrackedAndUnreleased()
            .then( async (result) => 
            {
                for(key in result)
                   await extract(result[key].dataValues.link);
            })
    } 
    catch (error) 
    {
        logger.error('error in Crackwatch.js , error: ' + error);
    }
}

module.exports = Crackwatch;