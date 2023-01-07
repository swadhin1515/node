const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function getVideoData(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = load(html);

    const title = $('#container h1.title').text();
    const description = $('#description').text();
    const subtitles = [];
    $('.caption-line').each((i, elem) => {
        const start = $(elem).attr('data-start');
        const end = $(elem).attr('data-end');
        const text = $(elem).text();
        subtitles.push({ start, end, text });
    });

    await browser.close();


    return { title, description, subtitles };
}

getVideoData('https://www.youtube.com/watch?v=dQw4w9WgXcQ').then(data => {
    console.log(data);
});