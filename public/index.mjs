// Initialize and add the map
let map;

async function getItems() {
  return new Promise((resolve,reject) => {
    let xhr = new XMLHttpRequest();
    const url='http://localhost:3000/items/';
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText))
    }
  })
}

async function initMap() {
  // The location of Uluru
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");


  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 42.4488, lng: -76.4866 },
    mapId: "DEMO_MAP_ID",
  });

  const items = await getItems();

  console.log(items)
  items.forEach(entry => { 
    const position = { lat: parseInt(entry.lat), lng: parseInt(entry.long) };
    new AdvancedMarkerElement({
      map: map,
      position: position,
      title: entry.item,
    });
  })

  // The marker, positioned at Uluru
  
}

initMap();