const puppeteer = require("puppeteer");

async function takeScreenShoot(wapId) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://wixer-app.herokuapp.com/publish/' + wapId, { waitUntil: 'networkidle2' })
    await page.waitForSelector('.section')
    // await page.screenshot({ path: './public/websites-screenshots/' + wapId + '.jpg' })
    await page.screenshot({ path: './api/img/websites-screenshots/' + wapId + '.jpg' })
    await browser.close()
}

module.exports = {
    takeScreenShoot
}