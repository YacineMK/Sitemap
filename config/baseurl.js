const { url } = require("./check");

const getBaseUrl = () => {
  return url.slice(0, url.indexOf("/", 8))
};

module.exports = getBaseUrl;
