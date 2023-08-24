let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 39.974, lng: -105.212 },
    zoom: 15
  });

  // URL for proxy server running with express
  const TILE_URL = 'http://localhost:3000/getTile/{zoom}/{x}/{y}';

  const layerID = 'lightboxTiles';

  const lightboxTileLayer = new google.maps.ImageMapType({
    name: layerID,
    getTileUrl: function (coord, zoom) {
        console.log(coord);
        let url = TILE_URL
            .replace('{zoom}', zoom)
            .replace('{x}', coord.x)
            .replace('{y}', coord.y);
        return url;
    },
    tileSize: new google.maps.Size(256, 256),
    minZoom: 18,
    maxZoom: 20
  })

  map.overlayMapTypes.push(lightboxTileLayer);
}