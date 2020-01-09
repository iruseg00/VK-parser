const logger = require('../../logs/log');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer'); 
const DistributionsService = require('../../services/DistributionsService');

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
            const browser = await puppeteer.launch({headless:true ,
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
                if ( a.match(/Free Games/i) || a.match(/Free Game Every Week/i))
                {
                    var object = {linksPhoto: [], timeUTC: []};
                    object.site = "www.epicgames.com";
                    object.topic = $('div > div > span' , elem).eq(1).text();
                    object.link = ("https://www.epicgames.com" + $(elem).attr('href'));
                    $('span > span > time' , elem).each((index , value) =>
                    {
                        object.timeUTC.push( $(value).attr('datetime') );
                    });
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
                                
                                DistributionsService.create(object);
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