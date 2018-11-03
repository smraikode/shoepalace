const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan('short'));

const router = require('./server/route.js');

app.use(express.static(path.join(__dirname, 'dist/angular-node')));

app.use(router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/angular-node/index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log("server is running on port " + port);
})