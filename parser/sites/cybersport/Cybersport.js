const queue = require('../../queue');
const {logger , memory} = require('../../logs/log');
const rp = require('request-promise');
const cheerio = require('cheerio');
const extract = require('./extract');

const link = 'https://www.cybersport.ru';

function GetLinks()
{
    try 
    {
        rp.get(link)
            .then((result) => 
                {
                    var $ = cheerio.load(result);
                    $("article.tape-cards > div > div > div > a.responsive-object").each( (i , elem)=>
                    {
                        let a =  link + ($(elem)).attr("href");
                        queue.push(cb =>
                        {
                            extract(a);
                            cb();
                        });    
                    });
                });
    } 
    catch (error) 
    {
        logger.error('error in Cybersport.js , error: ' + error);
    }
    finally
    {
        memory.info(`Cybersport.js \n` + 
        `rss       : ${process.memoryUsage().rss / 1048576}  MB\n` + 
        `Total Heap: ${process.memoryUsage().heapTotal / 1048576}  MB\n` + 
        `Used Heap : ${process.memoryUsage().heapUsed / 1048576} MB\n`);
    }
}


module.exports = GetLinks;