const { logger } = require('../../logs/log');
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
        var object = {};
        rp.get(link)
            .then((result) => 
            {
                object.site = "cybersport.ru";
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
                object.timeUTC = moment(object.timeUTC).utc().format(); 
                object.text = $("section.article__inner > div.typography").html();
                object.text = entities.decode(object.text);
                object.text = object.text.replace(/<script(.+?)([\s\S]*?)<\/script>/gm , '')
                                        .replace(/<figure(.+?)>/g , '')
                                        .replace(/<\/figure>/g , '' )
                                        .replace(/<strong>/g , '<b>')
                                        .replace(/<\/strong>/g , '</b>')
                                        .replace(/width="(.+?)" height="(.+?)"/g , '')
                                        .replace(/<figcaption(.*?)>/g , '')
                                        .replace(/<\/figcaption>/g , '')
                                        .replace(/<div data-id=(.+?)([\s\S]*?)<\/div>([\s\S]*?)<\/div>/gm , '')
                                        .replace(/<div data-id=(.+?)([\s\S]*?)<\/div>/gm , '')
                                        .replace(/\t{3,}/g , '')
                                        .replace(/<div class="icon-player([\s\S]*?)<\/div>"/gm , '')//если ошибка и пропадают блоки то она тут
                                        .replace(/<svg(.*?)([\s\S]*?)<\/svg>/gm , '')
                                        .replace(/class="(.+?)"/g , '')
                                        .replace(/style="(.+?)"/g , '');         
                $('figure.attach--image-center > div').find('img').each((i , elem)=>
                {
                    object.linksPhoto.push($(elem).attr('src'));
                });
                $('div.attach__slider-image > a ').each((i , elem)=>
                {
                    object.linksPhoto.push($(elem).attr('href'));
                });  
                
                PostsService.create(object);
                delete object;
            });
    }
    catch (error) 
    {
        logger.error('error in cybersport/extract.js , error: ' + error);
    }
};


module.exports = extract;