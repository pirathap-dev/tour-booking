const serverless = require('serverless-http');
const app = require('../app');
const connectDatabase = require('../config/database');

let handler;

module.exports = async (req, res) => {
  try {
    await connectDatabase(); // make sure DB is ready
    if (!handler) handler = serverless(app); // only wrap once
    return handler(req, res);
  } catch (err) {
    console.error('Serverless function error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
