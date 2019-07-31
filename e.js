const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" });
  const page = await browser.newPage();
  await page.goto('https://pulin-s-test.vankeservice.com/employee/echart.html#/funnel?title=%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE&data=%5B%7B%22value%22%3A4500,%22name%22%3A%22%E6%96%B0%E5%A2%9E%E5%AE%A2%E6%88%B7%22%7D,%7B%22value%22%3A80,%22name%22%3A%22%E5%B8%A6%E7%9C%8B%E9%87%8F%22%7D,%7B%22value%22%3A1810,%22name%22%3A%22%E6%84%8F%E5%90%91%E9%87%91%22%7D,%7B%22value%22%3A100,%22name%22%3A%22%E6%88%90%E4%BA%A4%E5%8D%95%E9%87%8F%22%7D%5D');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();