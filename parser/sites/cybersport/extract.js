const logger = require('../../logs/log');
const rp = require('request-promise');
const cheerio = require('cheerio');
const PostsService = require('../../services/PostsService');

function extract(link)
{
    try
    {
        var object = {};
        rp.get(link)
            .then((result) => 
            {
                object.link = link;
                object.linksPhoto = [];
                object.text = [];
                var $ = cheerio.load(result);
                object.type = $("header.article__header > div.article__meta > a.tag").text() 
                || $("section > header.article__header > div.article__meta > div > a.tag").text();
                object.topic = $("section > header.article__header > h1").text() 
                ||  $("header.article__header > h1").text();
                object.timeUTC = $("section > header.article__header > div.article__info > div.article__author > time").attr("datetime") 
                || $("header.article__header > div.article__info > div.article__author > a > div.author__title > time").attr("datetime");
                $("section.article__inner > div.typography > p").each((i , elem)=>
                {
                    object.text.push($(elem).text());
                });
                $('figure.attach--image-center > div').find('img').each((i , elem)=>
                {
                    object.linksPhoto.push($(elem).attr('src'));
                });
                $('div.attach__slider-image > a ').each((i , elem)=>
                {
                    object.linksPhoto.push($(elem).attr('href'));
                });
                object.site = "cybersport.ru";
                
                PostsService.create(object);
            });
    }
    catch (error) 
    {
        logger.error('error in cybersport/extract.js , error: ' + error);
    }
};


module.exports = extract;