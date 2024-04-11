const axios = require('axios');
const cheerio = require('cheerio');

const visitedUrls = new Set();

const crawl = async (url) => {
  if (visitedUrls.has(url)) return;
  console.log(`Crawling: ${url}`);
  visitedUrls.add(url);

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const links = $("a").map((i, link) => link.attribs.href).get();
    console.log(links); // For now, just log out the links found

    // Here, you could save the page data and links to a database

  } catch (error) {
    console.error(`Error crawling ${url}:`, error.message);
  }
};

crawl('http://example.com'); // Start crawling from a given website
