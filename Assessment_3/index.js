const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api', (req, res) => {
    res.json(req.body);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
