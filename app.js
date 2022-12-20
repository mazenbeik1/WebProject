const express = require('express');
const app = express();

app.listen(3000);

app.get('/', async(req, res) => {
    res.sendFile("./index.html",{root: __dirname});
    app.use(express.static("."));
  })

app.post('/studentView.html', async(req, res) => {
    console.log(req.body);
    res.end();
  })
