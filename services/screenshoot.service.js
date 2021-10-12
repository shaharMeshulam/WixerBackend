const puppeteer = require("puppeteer");
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'dq6ymh7ev',
    api_key: '435171335927387',
    api_secret: 'LiLTe3DgAmmgI1O76f0nJmrvGLE',
    secure: true
});

async function takeScreenShoot(wapName, wapId) {

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.setViewport({ width: 1600, height: 200 })
    if (wapName) await page.goto(`https://wixer-app.herokuapp.com/${wapName}`, { waitUntil: 'networkidle2' })
    else {
        await page.goto(`https://wixer-app.herokuapp.com/preview/${wapId}`, { waitUntil: 'networkidle2' })
    }
    await page.waitFor(1500);
    const screenshot = await page.screenshot({ encoding: "base64" })
        .then(function (data) {
            const base64Encode = `data:image/png;base64,${data}`
            return base64Encode
        })
    const photoUrl = await cloudinary.uploader.upload(screenshot,
        function (error, result) { return result.url })
    console.log('photoUrl', photoUrl);
    await browser.close()
    return photoUrl
}

module.exports = {
    takeScreenShoot
}