let map
let europa = { lat: 56.860336405312744, lng: 15.21568146421257 }


function init() {
    renderMap()
    getTripFromAPI()
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

function getTripFromApi() {

    axios
        .get('/api/trip')
        .then(response => printTripsMarkers(response.data))
        .catch(err => console.log(err))
}

function printTripsMarkers(trip) {

    trip.forEach(elm => {

        const position = { lat: elm.location.coordinates[1], lng: elm.location.coordinates[0] }

        new google.maps.Marker({
            map: map,
            position,
            title: elm.name
        })
    })
}
