const logger = require('../../logs/log');
const rp = require('request-promise');
const cheerio = require('cheerio');

function extract(link)
{
    var object = {};
    try 
    {
        rp.get(link)
            .then((result) => 
                {
                    object.link = link;
                    var $ = cheerio.load(result);
                    object.type = $("header.article__header > div.article__meta > a.tag").text() 
                    || $("section > header.article__header > div.article__meta > div > a.tag").text();
                    object.topic = $("section > header.article__header > h1").text() 
                    ||  $("header.article__header > h1").text();
                    object.time = $("section > header.article__header > div.article__info > div.article__author > time").text() 
                    || $("header.article__header > div.article__info > div.article__author > a > div.author__title > time").text();
                    object.timeUTC = $("section > header.article__header > div.article__info > div.article__author > time").attr("datetime") 
                    || $("header.article__header > div.article__info > div.article__author > a > div.author__title > time").attr("datetime");
                    object.text = [];
                    $("section.article__inner > div.typography > p").each((i , elem)=>
                    {
                        object.text.push($(elem).text());
                    });
                    
                     console.log(object.link)
                    // console.log("\x1b[44m%s\x1b[0m" , object.text)
                });
    } 
    catch (error) 
    {
        console.log(error);
        logger.error('error in extract.js , error: ' + error);
    }
}


module.exports = extract;