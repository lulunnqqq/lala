const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express()

app.use(cors());

app.get('/', (req, res) => {
    const file = req.query.file;
    return res.send(fs.readFileSync(path.join(__dirname, file), {
        encoding: 'utf-8'
    })); 
});

app.get('/host', (req, res) => {
    return res.send(fs.readFileSync(path.join(__dirname, 'host.json'), {
        encoding: 'utf-8'
    }));
})

app.get('/provider', (req, res) => {
    return res.send(fs.readFileSync(path.join(__dirname, 'provider.json'), {
        encoding: 'utf-8'
    }));
})

app.get('/config', (req, res) => {
    return res.send(fs.readFileSync(path.join(__dirname, 'config.json'), {
        encoding: 'utf-8'
    }));
})

app.listen(3001);