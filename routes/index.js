var fs = require('fs');
var express = require('express');
var router = express.Router();

const chrome = require('../chrome')

var crypto = require('crypto')

router.get('/', async function (req, res, next) {
  const { url, method, data, title } = req.query;

  if (!url || !data || !method) {
    res.send('params error');
  }

  const toUrl = decodeURIComponent(url + '#/' + method + '?title=' + title + '&data=' + data);
  const page = await chrome.getPage()

  let shasum = crypto.createHash('sha1');
  shasum.update(encodeURIComponent(method + data));
  const fileKey = './image/' + shasum.digest('hex');
  console.log(fileKey);


  if (fs.existsSync(fileKey)) {
    const img = fs.readFileSync(fileKey)

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });

    res.end(img);

    return;
  }


  const browser = await puppeteer.launch({ executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" })
  const page = await browser.newPage();

  page.setViewport({
    width: 600,
    height: 600,
    deviceScaleFactor: 1,
  });


  await page.goto(toUrl);

  setTimeout(async function () {

    const n = await page.screenshot({
      encoding: "binary"
    });

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': n.length
    });

    res.end(n);

    //同步方法
    fs.writeFileSync(fileKey, n);

    await browser.close();
  }, 500)

});

module.exports = router;
