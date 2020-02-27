const {logger , memory} = require('../../logs/log');
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
    finally
    {
        memory.info(`crackwatch/extract.js \n` + 
        `rss       : ${process.memoryUsage().rss / 1048576}  MB\n` + 
        `Total Heap: ${process.memoryUsage().heapTotal / 1048576}  MB\n` + 
        `Used Heap : ${process.memoryUsage().heapUsed / 1048576} MB\n`);
    }
}

module.exports = GetInfo;