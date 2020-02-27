const queue = require('../../queue');
const {logger , memory} = require('../../logs/log');
const rp = require('request-promise');
const cheerio = require('cheerio');
const extract = require('./extract');

const link = 'https://www.playground.ru';

function GetLinks()
{
    try 
    {
        rp.get(link)
            .then((result) => 
                {
                    var $ = cheerio.load(result);
                    var a;
                    $('div[id="contentLayout"] > div.clearfix > div.features-slider-item > a').each( (i , elem)=>
                    {
                        a = ($(elem)).attr("href");
                        queue.push(cb =>
                        {
                            extract(a);
                            cb();
                        });    
                    });
                    $('div.post-flow-container > article.post > div.post-footer > div.post-footer-aside > span.module-item-counters > a').each( (i , elem)=>
                    {
                        a = link + ($(elem)).attr("href");
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