const logger = require('../../logs/log');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer'); 
const PostsService = require('../../services/PostsService');

const link = 'https://www.epicgames.com/store/';

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function EpicGames()
{
    (async () => {
        try 
        {
            const browser = await puppeteer.launch({
                args: ['--disable-dev-shm-usage' , '--no-sandbox']
              });
            const page = await browser.newPage();
            await page.goto(link);
            await page.waitForSelector("div.Discover-section_c504570a");
            await sleep(20000);
            const html = await page.content();    
            await browser.close(); 
            var $ = cheerio.load(html);
            $('a').each( (i , elem)=>
            {
                var a = String($(elem).attr('aria-label'));
                if ( a.match(/Free Game Every Week/i) )
                {
                    var object = {linksPhoto: []};
                    object.site = "www.epicgames.com";
                    object.type = "Раздача игр";
                    object.topic = a.substring(29 , a.indexOf(',' , 30 ));
                    object.link = ("https://www.epicgames.com" + $(elem).attr('href'));
                    object.timeUTC = ($('span > span > time' , elem).attr('datetime'));
                    var DIV_Card_content = String($( 'div' , elem).attr('class'));
                    if(DIV_Card_content.match(/Card-content_/i))
                    {
                        var DIV_Card_imageW = String($('div > div' , elem).attr('class'));
                        if(DIV_Card_imageW.match(/Card-imageWrapper/i))
                        {
                            var DIV_Card_image = String($(`div.${DIV_Card_imageW} > div` , `div.${DIV_Card_content}` , elem).attr('class'));
                            if(DIV_Card_image.match(/Card-image_/i))
                            {    
                                object.linksPhoto.push(String(($('img' , elem).attr('data-image'))));
                                object.text = ["FREE"];
                                PostsService.create(object);
                            }
                        }
                    }
                    delete object;
                }
            }); 
        }
        catch(error)
        {
            logger.error('error in EpicGames.js -> browser , error: ' + error);
        }       
    })();
}


module.exports = EpicGames;