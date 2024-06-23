const puppeteer = require('puppeteer');
const blogScraper = require('./scraper');
const url = "https://valorantesports.com/en-GB/news";

export const vct = async () => {
    return await blogScraper(url, '.d_block text-align_center bg_white.100 text_black.100 p_38px_24px_24px', 'a');

}

