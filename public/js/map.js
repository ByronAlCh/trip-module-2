let map
let europa = { lat: 56.860336405312744, lng: 15.21568146421257 }

function init() {
    renderMap()
    getTripFromApi()
}

function renderMap() {
    map = new google.maps.Map(
        document.querySelector('#map'),
        {
            zoom: 5,
            center: europa,
        }
    )
}

// TODO OPCIONAL: INCLUIR SERVICIOS EN CLIENTE

function getTripFromApi() {

    axios
        .get('/api/trip')
        .then(response => printTripsMarkers(response.data))
        .catch(err => console.log(err))
}

function printTripsMarkers(trip) {
    trip.forEach(elm => {

        const position = { lat: elm.location.coordinates[1], lng: elm.location.coordinates[0] }

        const marker = new google.maps.Marker({
            map: map,
            position,
            title: elm.name
        })

        const infoContent = `<h3>${elm.namePlace}</h3><h6>${elm.description}</h6>`

        const infoWindow = new google.maps.InfoWindow({
            content: infoContent
        })

        marker.addListener('click', function () {
            infoWindow.open(map, marker)
        })
    })
}

