"use strict"

const express = require('express');
const path    = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function (req, res) {
    res.sendFile('../client/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = { app }