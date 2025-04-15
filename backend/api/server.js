// const app = require('../app');
// const connectDatabase = require('../config/database');


// connectDatabase();

// const server = app.listen(process.env.PORT, () => {
//     console.log(`Server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`)
//     console.log('Environment:', process.env.NODE_ENV);
// });

const { createServer } = require('http');
const { parse } = require('url');
const app = require('../app');
const connectDatabase = require('../config/database');

connectDatabase();

module.exports = (req, res) => {
    const { method, url } = req;
    const { pathname } = parse(url);

    if (method === 'GET' && pathname === '/') {
        res.status(200).send('Serverless Backend on Vercel');
        return;
    }

    // Allow Express app to handle the request
    app(req, res);
};
