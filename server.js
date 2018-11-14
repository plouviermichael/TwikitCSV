// server.js
const express = require('express');
const app = express();

const userRoutes = require('./routes/twikit');

// routes ======================================================================
app.use('/', userRoutes);

// launch ======================================================================
app.listen(8080);
console.log('Run Twikit application on port: 8080');
