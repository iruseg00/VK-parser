const {logger} = require('../../logs/log');
const rp = require('request-promise');
const Entities = require('html-entities').XmlEntities;
const cheerio = require('cheerio');
const PostsService = require('../../services/PostsService');
const moment = require('moment');

const entities = new Entities();

function extract(link)
{
    try
    {
        var object = 
        {
            site: "playground.ru" ,
            link: link.replace('#commentsList' , '') ,
            linksPhoto: [] ,
        };
        rp.get(link)
            .then((result) => 
            {
                var $ = cheerio.load(result);
                object.type = $('span[itemprop="itemListElement"] > a > span[itemprop="name"]').text();
                object.topic = $('div.post-heading > h1[itemprop="headline"]').text();
                object.timeUTC = $('time[itemprop="datePublished"]').attr("datetime");
                object.timeUTC = moment(object.timeUTC).utc().format();
                object.text = $('div.article-content').html();           
                object.text = entities.decode(object.text);
                object.text = object.text.replace(/<figure>/g , '')
                            .replace(/<\/figure>/g , '' )
                            .replace(/<\/a>/g , '')
                            .replace(/<a(.+?)>/g , '')
                            .replace(/loading="lazy" alt/g , '')
                            .replace(/<strong>/g , '<b>')
                            .replace(/<\/strong>/g , '</b>')
                            .replace(/width="(.+?)" height="(.+?)"/g , '');         
                $('div.article-content > figure ').find('img').each((i , elem)=>
                {
                    object.linksPhoto.push($(elem).attr('src'));
                });
                
                PostsService.create(object);
                delete object;
            });
    }
    catch (error) 
    {
        logger.error('error in playground/extract.js , error: ' + error);
    }
};


module.exports = extract;