const cheerio = require('cheerio');
const getBaseUrl = require('../config/baseurl');

const getLinks = (html) => {
    const Links = [];;
    

    const $ = cheerio.load(html);

    $('a').each((i, link) => {
        const href = $(link).attr('href');
        if (href && href.startsWith(getBaseUrl())) {
            Links.push(href);
        }
    });

    $('link').each((i, link) => {
        const href = $(link).attr('href');
        if (href && href.startsWith(getBaseUrl())) {
            Links.push(href);
        }
    });

    return Links;
};

module.exports = getLinks;
