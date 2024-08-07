const https = require('https');
const http = require('http');
const getLinks = require('./getlinks');

const Fetech = async (url, visited = new Set(), depth) => {
    // Return if depth is 0 or URL has already been visited
    if (depth < 0 || visited.has(url)) {
        return;
    }

    // Mark URL as visited
    visited.add(url);

    // Determine protocol
    const protocol = url.startsWith('https') ? https : http;

    return new Promise((resolve, reject) => {
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

            res.on('end', async () => {
                try {
                    console.log(`Fetched ${url}`);
                    const links = getLinks(data);

                    console.log(`Links found on ${url}:`, links);

                    for (const link of links) {
                        if (!visited.has(link)) {
                            console.log(`Visiting ${link}`);
                            await Fetech(link, visited, depth - 1);
                        }
                    }

                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
};

module.exports = Fetech;
