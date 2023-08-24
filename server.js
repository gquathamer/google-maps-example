require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.get('/getTile/:zoom/:x/:y', (req, res) => {
    fetch(`https://api.lightboxre.com/v1/parcels/us/tile/${req.params.zoom}/${req.params.x}/${req.params.y}`, { 
        headers: {
            "Content-Type": "image/png",
            "x-api-key": process.env.LIGHTBOX_API_KEY
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