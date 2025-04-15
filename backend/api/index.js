const serverless = require('serverless-http');
const app = require('../app'); // Adjust the path based on your project structure

module.exports.handler = serverless(app);
