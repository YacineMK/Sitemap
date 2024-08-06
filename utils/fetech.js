const https = require('https');
const http = require('http');
const getLinks = require('./getlinks');

const Fetech = (url, visited = new Set(), depth ) => {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        protocol.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error('Error fetching data'));
                return;
            }

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', async () => {
                try {
                    console.log(`Data fetched successfully from ${url}`);
                    const links = getLinks(data);
                    visited.add(url);

                    if (depth > 0) {
                        for (const link of links) {
                            if (!visited.has(link)) {
                                await Fetech(link, visited, depth - 1);
                            }
                        }
                    }

                    resolve(links);
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
