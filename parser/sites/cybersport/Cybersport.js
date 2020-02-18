const queue = require('../../queue');
const logger = require('../../logs/log');
const rp = require('request-promise');
const cheerio = require('cheerio');
const extract = require('./extract');
const CybersportService = require('../../services/CybersportService');

const link = 'https://www.cybersport.ru';

function GetLinks()
{
    try 
    {
        rp.get(link)
            .then(async(result) => 
                {
                    var $ = cheerio.load(result);
                    var links = [];
                    links = await CybersportService.GetAllLinksOver2Week();
                    $("article.tape-cards > div > div > div > a.responsive-object").each( (i , elem)=>
                    {
                        let a =  link + ($(elem)).attr("href");
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
        logger.error('error in Cybersport.js , error: ' + error);
    }
}


module.exports = GetLinks;