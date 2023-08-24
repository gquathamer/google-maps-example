const express = require('express');
const app = express();
const port = 3000;

app.get('/getTile/:zoom/:x/:y', (req, res) => {
    console.log(req);
    console.log(`https://tile.openstreetmap.org/${req.params.zoom}/${req.params.x}/${req.params.y}.png`);
    fetch(`https://tile.openstreetmap.org/${req.params.zoom}/${req.params.x}/${req.params.y}.png`, { 
        headers: {
            "Content-Type": "image/png",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(response => response.arrayBuffer())
        .then(image => {
            res.contentType('image/png');
            res.send(Buffer.from(image));
        })
        .catch(error => console.error(error));
})

app.listen(port, () => {
  console.log(`Proxy listening on port ${port}`);
})