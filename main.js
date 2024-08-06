const getBaseUrl = require('./config/baseurl');
const Fetech = require('./utils/fetech');
const process = require('process');
const fs = require('fs');
const arrayToXml = require('./utils/xmlfile');
const path = require('path');

const main = async () => {
    try {
        const startUrl = getBaseUrl();
        const maxDepth = process.argv[2] || 1000; 

        const links = await Fetech(startUrl, new Set(), maxDepth);
        console.log('completed Links:', links);
        
        fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), arrayToXml(links));

    } catch (error) {
        console.error('Error:', error);
    }
};

main();
