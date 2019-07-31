var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

/* GET home page. */
router.get('/', async function (req, res, next) {

  const browser = await puppeteer.launch({ executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" });
  const page = await browser.newPage();


  await page.setViewport({
    width: 600,
    height: 600,
    deviceScaleFactor: 1,
  });


  const toUrl = decodeURIComponent(req.query.url + '#/' + req.query.method + '?title=' + req.query.title + '&data=' + req.query.data);

  await page.goto(toUrl);
  const n = await page.screenshot({
    encoding: "binary"
  });


  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': n.length
  });
  res.end(n);

  await browser.close();

  // var img = new Buffer(data, 'base64');

});

module.exports = router;
