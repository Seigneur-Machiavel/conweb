const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 45663; // Default port
const app = express();
app.use(express.static('public'));

// serve index_bounty.html
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public/index_bounty.html')) });
app.get('//', (req, res) => { res.sendFile(path.join(__dirname, 'public/index_bounty.html')) });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));