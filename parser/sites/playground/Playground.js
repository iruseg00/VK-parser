const queue = require('../../queue');
const {logger , memory} = require('../../logs/log');
const rp = require('request-promise');
const cheerio = require('cheerio');
const extract = require('./extract');
const PlaygroundService = require('../../services/PlaygroundService');

const link = 'https://www.playground.ru';

function GetLinks()
{
    try 
    {
        rp.get(link)
            .then(async(result) => 
                {
                    var $ = cheerio.load(result);
                    var a , links = [];
                    links = await PlaygroundService.GetAllLinksOver2Week();
                    $('div[id="contentLayout"] > div.clearfix > div.features-slider-item > a').each( (i , elem)=>
                    {
                        a = ($(elem)).attr("href").replace('#commentsList' , '');
                        if ( !links.includes(a) )
                        {
                            queue.push(cb =>
                            {
                               extract(a);
                                cb();
                            });   
                        }  
                    });
                    $('div.post-flow-container > article.post > div.post-footer > div.post-footer-aside > span.module-item-counters > a').each( (i , elem)=>
                    {
                        a = link + ($(elem)).attr("href").replace('#commentsList' , '');
                        if ( !links.includes(a) )
                        {
                            queue.push(cb =>
                            {
                               extract(a);
                                cb();
                            });   
                        }  
                    });
                });
    }  
    catch (error) 
    {
        logger.error('error in Playground.js , error: ' + error);
    }
    finally
    {
        memory.info(`Playground.js \n` + 
        `rss       : ${process.memoryUsage().rss / 1048576}  MB\n` + 
        `Total Heap: ${process.memoryUsage().heapTotal / 1048576}  MB\n` + 
        `Used Heap : ${process.memoryUsage().heapUsed / 1048576} MB\n`);
    }
}


module.exports = GetLinks;