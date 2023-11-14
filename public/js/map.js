const ironhackCoords = { lat: 40.392521370648154, lng: - 3.6989879718518366 }
let myMap

function init() {
    renderMap()
    getTripsFromAPI()
}

function renderMap() {

    myMap = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 13,
            center: ironhackCoords,
        }
    )
}

function getTripsFromAPI() {

    axios
        .get('/api/trip')
        .then(response => printTripsMarkers(response.data))
        .catch(err => console.log(err))
}

// function printTripsMarkers(trips) {

//     trips.forEach(elm => {

//         const position = { lat: elm.location.coordinates[1], lng: elm.location.coordinates[0] }

//         new google.maps.Marker({
//             map: myMap,
//             position,
//             title: elm.name
//         })
//     })
// }