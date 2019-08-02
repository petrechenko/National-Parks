const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const port = process.env.PORT || 3000;

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/View/index.htm'));
});

app.use(express.static(__dirname + '/View'));
app.use(express.static(__dirname + '/Script'));

app.use('/', router);

app.listen(port, () => {
    console.log('Running');
});