const https = require('https');
const http = require('http');
const urlModule = require('url');
const getLinks = require('./getlinks'); 
const fetchPage = (url) => {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        protocol.get(url, (res) => {
            if (res.statusCode !== 200) {
                console.error(`Error fetching ${url}: Status code ${res.statusCode}`);
                reject(new Error(`Error fetching ${url}`));
                return;
            }

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
};

const Fetech = async (url, visited = new Set(), maxDepth = 1) => {
    if (maxDepth < 0 || visited.has(url)) {
        return;
    }

    visited.add(url);
    const links = [];
    
    try {
        const data = await fetchPage(url);
        const newLinks = getLinks(data);

        console.log(`Fetched ${url}`);
        console.log(`Links found on ${url}:`, newLinks);

        for (const link of newLinks) {
            let absoluteLink = urlModule.resolve(url, link);

            if (!visited.has(absoluteLink) && !absoluteLink.match(/\.(jpg|png)$/i) && !absoluteLink.includes('mailto')) {
                links.push(absoluteLink);
                await Fetech(absoluteLink, visited, maxDepth - 1); 
            }
        }
    } catch (error) {
        console.error(`Error processing ${url}:`, error);
    }

    return links;
};

module.exports = Fetech;
