
let page = null;
let browser = null;
const puppeteer = require('puppeteer');

exports.getPage = async function getPage() {
    if (page != null) {
        return page;
    }

    try {
        browser = await puppeteer.launch({ executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" })
        page = await browser.newPage();
    } catch (browerError) {
        console.log(browerError)
    };

    /* 
        const aHandle = await page.evaluateHandle(() => document.body);
        const resultHandle = await page.evaluateHandle(body => body.addEventListener('renderFinished', () => console.log('server renderFinished')), aHandle);
    
        console.log(await resultHandle.jsonValue());
        console.log(resultHandle);
    
        await resultHandle.dispose();
         */

    const cached = await page.setCacheEnabled(true)

    return await page.setViewport({
        width: 600,
        height: 600,
        deviceScaleFactor: 1,
    });

}

exports.close = async function close() {
    return await browser.close();
}