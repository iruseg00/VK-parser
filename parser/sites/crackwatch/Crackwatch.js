const {logger , memory} = require('../../logs/log');
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
    finally
    {
        memory.info(`index.js \n` + 
        `rss       : ${process.memoryUsage().rss / 1048576}  MB\n` + 
        `Total Heap: ${process.memoryUsage().heapTotal / 1048576}  MB\n` + 
        `Used Heap : ${process.memoryUsage().heapUsed / 1048576} MB\n`);
    }
}

module.exports = Crackwatch;