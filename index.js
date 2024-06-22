const cheerio = require('cheerio');
const axios = require('axios');
const notifier = require('node-notifier');

// Target website URL and configuration (replace with your details)
const targetUrl = 'https://www.example.com/news';
let lastSeenArticles = []; // Array to store previously seen articles

// Function to check for new articles
async function checkForNewArticles() {
  try {
    // Fetch website content
    const response = await axios.get(targetUrl);
    const html = response.data;

    // Parse HTML using Cheerio
    const $ = cheerio.load(html);

    // Extract articles and identify new ones
    const newArticles = [];
    $('.article-item').each((_, element) => {
      const title = $(element).find('.article-title').text().trim();
      // Implement logic to check for new articles based on timestamps or other identifiers
      if (!lastSeenArticles.includes(title)) {
        newArticles.push(title);
        lastSeenArticles.push(title); // Update seen articles list
      }
    });

    // Display notifications for new articles
    newArticles.forEach(title => {
      notifier.notify({
        title: 'New Article!',
        message: title
      });
    });

  } catch (error) {
    console.error('Error fetching website content:', error);
  }
}

// Schedule checks for new articles (e.g., every hour)
setInterval(checkForNewArticles, 3600000); // Milliseconds in an hour
