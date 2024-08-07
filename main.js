const getBaseUrl = require('./config/baseurl');
const Fetech = require('./utils/fetech');
const process = require('process');
const fs = require('fs');
const arrayToXml = require('./utils/xmlfile');
const path = require('path');

const main = async () => {
    try {
        const startUrl = getBaseUrl();
        const maxDepth = parseInt(process.argv[2], 10) || 3; 

        const visited = new Set();
        const links = await Fetech(startUrl, visited, maxDepth);

        console.log('Completed Links:', links);

        const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
        fs.writeFileSync(sitemapPath, arrayToXml(links));
        console.log(`Sitemap written to ${sitemapPath}`);

    } catch (error) {
        console.error('Error:', error);
    }
};

main();
