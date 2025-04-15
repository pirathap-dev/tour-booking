const serverless = require('serverless-http');
const app = require('../app');
const connectDatabase = require('../config/database');

let connected = false;

module.exports = async (req, res) => {
  if (!connected) {
    await connectDatabase();
    connected = true;
  }

  const handler = serverless(app);
  return handler(req, res);
};
