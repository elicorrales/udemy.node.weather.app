/* eslint-disable no-debugger */
/* eslint-disable no-undef */
/* eslint-disable no-console */

var locationService1Busy = false;
var locationService2Busy = false;
var searchEnabled = true;
var zoomsEnabled = false;

var zoom = 0;

const tryEnableSearchEntry = (locationId) => {
    if (locationId === 'location1') {
        locationService1Busy = false;
    }
    if (locationId === 'location2') {
        locationService2Busy = false;
    }
    if(!locationService1Busy && !locationService2Busy) {
        enableControls();
    }
};

const getWeather = (url,weatherId) => {
    let weatherElem = document.getElementById(weatherId);
    axios.get(url)
        .then(
            result => {
                console.log(result);
                weatherElem.innerHTML = '<p>'+result.data.weather+' , '+ result.data.temp+ ' degrees</p>';
            }
        )
        .catch(
            error => {
                console.log(error);
                weatherElem.innerHTML = '<p>'+error+'</p>';
            }
        )
}

const getWeathers = (lat,lng,weatherId1,weatherId2) => {
    const url1 ='/weather/1?lat='+lat+'&lng='+lng;
    getWeather(url1,weatherId1);
    const url2 ='/weather/2?lat='+lat+'&lng='+lng;
    getWeather(url2,weatherId2);
};

const getMap = (lat,lng,mapElemId,locationId,weatherId1,weatherId2) => {
    const url = '/map?lat='+lat+'&lng='+lng+'&zoom='+zoom;
    axios.get(url)
        .then(
            result => {
                if(result.data && result.data.filename) {
                    let mapElem = document.getElementById(mapElemId);
                    mapElem.innerHTML = '<p><img src="http://localhost:8080/img/maps/' + result.data.filename + '"/></p>';
                    getWeathers(lat,lng,weatherId1,weatherId2);
                }
                tryEnableSearchEntry(locationId);
            }
        )
        .catch(
            error => {
                console.log(error);
                tryEnableSearchEntry(locationId);
            }
        )
};

const getLocation = (locationparms) => {

    const {path,headingId,locationId,mapInfoId,weatherId1,weatherId2} = locationparms; 

    let headElem = document.getElementById(headingId);
    let locElem = document.getElementById(locationId);
    axios.get(path)
        .then(
            result => {
                let url = result.data.url;
                headElem.innerHTML = url;
                let adr = result.data.address;
                let output = adr;
                if (result.data.latlng) {
                    let lat = result.data.latlng.lat;
                    let lng = result.data.latlng.lng;
                    output +=  '<br/>' + 'lat: ' + lat + ' , lng: ' + lng;
                    getMap(lat,lng,mapInfoId,locationId,weatherId1,weatherId2);
                } else {
                    tryEnableSearchEntry(locationId);
                }
                locElem.innerHTML = '<p>' + output + '</p>';
            }
        )
        .catch(
            error => {
                if (error.response && error.response.data) {
                    if (error.response.data.message) {
                        let output = error.response.data.message;
                        locElem.innerHTML = '<p>' + output + '</p>';
                    } else {
                        locElem.innerHTML = '';
                    }
                    if (error.response.data.url) {
                        let output = error.response.data.url;
                        headElem.innerHTML = '<p>' + output + '</p>';
                    } else {
                        headElem.innerHTML = '';
                    }
                }
                let mapElem = document.getElementById(mapInfoId);
                mapElem.innerHTML = '';

                tryEnableSearchEntry(locationId);
            }
        );

};

const getLocations = () => {
    const adrEntry = document.getElementById('addressSearchEntry').value;
    const address = encodeURI(adrEntry);
    locationParms1 = {
        path:'/location/1?address='+address,
        headingId:'locurl1',
        locationId:'location1',
        mapInfoId:'maploc1',
        weatherId1:'weather11',
        weatherId2:'weather12',
    };
    getLocation(locationParms1);
    locationParms2 = {
        path:'/location/2?address='+address,
        headingId:'locurl2',
        locationId:'location2',
        mapInfoId:'maploc2',
        weatherId1:'weather21',
        weatherId2:'weather22',
    };
    getLocation(locationParms2);
};

const doCheckShouldDisableZooms = () => {
    const adrEntryValue = document.getElementById('addressSearchEntry').value;
    if (adrEntryValue === '') {
        disableZooms();
    }
};

// eslint-disable-next-line no-unused-vars
const doLocationSearch = (event,obj) => {
    //console.log(obj.value);
    if (obj.value.length < 2 || event.code != 'Enter') {
        return;
    }
    locationService1Busy = true;
    locationService2Busy = true;
    mapServiceBusy = true;
    disableControls();
    document.getElementById('locurl1').innerHTML = 'Loading Location Service 1...';
    document.getElementById('locurl2').innerHTML = 'Loading Location Service 2...';
    document.getElementById('location1').innerHTML = 'Loading Location Info...';
    document.getElementById('location2').innerHTML = 'Loading Location Info...';
    document.getElementById('maploc1').innerHTML = 'Loading Map Info...';
    document.getElementById('maploc2').innerHTML = 'Loading Map Info...';
    getLocations();
};


const enableZooms = () => {
    let zoomInElem = document.getElementById('zoomIn');
    zoomInElem.style.color = 'black';
    let zoomOutElem = document.getElementById('zoomOut');
    zoomOutElem.style.color = 'black';
    zoomsEnabled = true;
};

const disableZooms = () => {
    let zoomInElem = document.getElementById('zoomIn');
    zoomInElem.style.color = 'grey';
    let zoomOutElem = document.getElementById('zoomOut');
    zoomOutElem.style.color = 'grey';
    zoomsEnabled = false;
};

const enableControls = () => {
    document.getElementById('addressSearchEntry').disabled = false;
    searchEnabled = true;
    enableZooms();
};

const disableControls = () => {
    document.getElementById('addressSearchEntry').disabled = true;
    searchEnabled = false;
    disableZooms();
};

const doZoomIn = () => {
    if (!zoomsEnabled) { return; }
    disableControls();
    zoom+=1;
    getLocations();
};


const doZoomOut = () => {
    if (!zoomsEnabled) { return; }
    disableControls();
    zoom-=1;
    getLocations();
};

const doFocusOnZoomIn = () => {
    if (!zoomsEnabled) { return; }
    let zoomInElem = document.getElementById('zoomIn');
    zoomInElem.style.color = 'blue';
}

const doFocusOnZoomOut = () => {
    if (!zoomsEnabled) { return; }
    let zoomOutElem = document.getElementById('zoomOut');
    zoomOutElem.style.color = 'blue';
}


const doNotFocusOnZoomIn = () => {
    if (!zoomsEnabled) { return; }
    let zoomInElem = document.getElementById('zoomIn');
    zoomInElem.style.color = 'black';
}

const doNotFocusOnZoomOut = () => {
    if (!zoomsEnabled) { return; }
    let zoomOutElem = document.getElementById('zoomOut');
    zoomOutElem.style.color = 'black';
}

const doDownOnZoomIn = () => {
    if (!zoomsEnabled) { return; }
    let zoomInElem = document.getElementById('zoomIn');
    zoomInElem.style.color = 'red';
}

const doDownOnZoomOut = () => {
    if (!zoomsEnabled) { return; }
    let zoomOutElem = document.getElementById('zoomOut');
    zoomOutElem.style.color = 'red';
}

const doUpOnZoomIn = () => {
    if (!zoomsEnabled) { return; }
    let zoomInElem = document.getElementById('zoomIn');
    zoomInElem.style.color = 'blue';
}

const doUpOnZoomOut = () => {
    if (!zoomsEnabled) { return; }
    let zoomOutElem = document.getElementById('zoomOut');
    zoomOutElem.style.color = 'blue';
}

