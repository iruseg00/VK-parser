const {logger} = require('../../logs/log');
const puppeteer = require('puppeteer'); 
const cheerio = require('cheerio');
const CrackwatchService = require('../../services/CrackwatchService')

async function GetInfo(link)
{
    try 
    {
        const browser = await puppeteer.launch({headless:true ,
            args: ['--disable-dev-shm-usage' , '--no-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(link);
        await page.waitForSelector("div.status-bottom");
        const html = await page.content();    
        await browser.close(); 
        var $ = cheerio.load(html);
        var status = $('div.game-page-header-over > div > div > div.status-bottom').text();   
        CrackwatchService.Update(status , link);
    } 
    catch (error) 
    {
        logger.error('error in crackwatch/extract.js , error: ' + error);
    }
}

module.exports = GetInfo;