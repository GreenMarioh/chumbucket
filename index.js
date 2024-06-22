const cheerio = require('cheerio');
const axios = require('axios');
const notifier = require('node-notifier');

// Target website URL
const targetUrl = 'https://valorantesports.com/en-GB/news';

// Stores previously seen articles to identify new ones
let lastSeenArticles = [];

// Function to check for new articles
async function checkForNewArticles() {
  try {
    // Fetch website content
    const response = await axios.get(targetUrl);
    const html = response.data;

    // Parse HTML using Cheerio
    const $ = cheerio.load(html);

    // Extract articles
    const articles = [];
    $('.group.pos_relative.font_dinNextLtPro.bg_white.100').each((_, element) => { // Target article item container
      const title = $(element).find('.mb_30.fs_22.leading_22px.fw_700').text().trim(); // Extract title from element
      articles.push(title);
    });

    // Identify new articles (same logic as before)
    const newArticles = articles.filter(title => !lastSeenArticles.includes(title));

    // Update last seen articles
    lastSeenArticles = articles;

    // Display notifications for new articles
    newArticles.forEach(title => {
      notifier.notify({
        title: 'New Valorant Esports Article!',
        message: title
      });
    });

  } catch (error) {
    console.error('Error fetching website content:', error);
  }
}

// Schedule checks for new articles (e.g., every hour)
setInterval(checkForNewArticles, 3600000); // Milliseconds in an hour

