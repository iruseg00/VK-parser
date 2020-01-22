const queue = require('../../queue');
const logger = require('../../logs/log');
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
}


module.exports = GetLinks;