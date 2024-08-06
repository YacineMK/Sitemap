const getBaseUrl = require("../config/baseurl");
const { url } = require("../config/check");

const arrayToXml = (array) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += "<root>\n";
  xml += `<urlset xmlns="${url}">\n`;
  array.map((item) => {
    xml += `<url>\n  <loc>${item}</loc>\n</url>\n`;
  });
  xml += "</urlset>\n</root>";
  return xml;
};

module.exports = arrayToXml;