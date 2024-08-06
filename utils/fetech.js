const https = require('https');
const url = require('../config/check').url;

const fetech = () => {
    try {
        https.get(url,(res)=>{
            if (res.statusCode !== 200) {
                console.error('Error fetching data');
                return;
            }
            else {
                let data = '';
                res.on('data',(chunk)=>{
                    data += chunk;
                });
                res.on('end',()=>{
                    console.log('Data fetched successfully : ',data);
                });
            }
        })
    } 
    catch (error) {
        process.exit(error.message);
    }
};

module.exports = fetech;