/* eslint-disable no-debugger */
/* eslint-disable no-undef */
/* eslint-disable no-console */

const getMap = (lat,lng,mapElemId) => {
    const url = '/map?lat='+lat+'&lng='+lng;
    axios.get(url)
        .then(
            result => {
                console.log(result.data);
                if(result.data && result.data.filename) {
                    let mapElem = document.getElementById(mapElemId);
                    mapElem.innerHTML = '<p><img src="http://localhost:8080/img/maps/' + result.data.filename + '"/></p>';
                }
            }
        )
        .catch(
            error => {
                console.log(error);
            }
        )
};

const getLocation = (locationparms) => {

    const {path,headingId,locationId,mapInfoId} = locationparms; 

    let headElem = document.getElementById(headingId);
    let locElem = document.getElementById(locationId);
    axios.get(path)
        .then(
            result => {
                let url = result.data.url;
                let adr = result.data.address;
                let lat = result.data.latlng.lat;
                let lng = result.data.latlng.lng;
                headElem.innerHTML = url;
                let output = adr + '<br/>' + 'lat: ' + lat + ' , lng: ' + lng;
                locElem.innerHTML = '<p>' + output + '</p>';
                getMap(lat,lng,mapInfoId);
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
            }
        );

};

// eslint-disable-next-line no-unused-vars
const doLocation = (event,obj) => {
    //console.log(obj.value);
    if (obj.value.length < 2 || event.code != 'Enter') {
        return;
    }
    document.getElementById('locurl1').innerHTML = 'Loading Location Service 1...';
    document.getElementById('locurl2').innerHTML = 'Loading Location Service 2...';
    document.getElementById('location1').innerHTML = 'Loading Location Info...';
    document.getElementById('location2').innerHTML = 'Loading Location Info...';
    document.getElementById('maploc1').innerHTML = 'Loading Map Info...';
    document.getElementById('maploc2').innerHTML = 'Loading Map Info...';
    const address = encodeURI(obj.value);
    locationParms1 = {
        path:'/location/1?address='+address,
        headingId:'locurl1',
        locationId:'location1',
        mapInfoId:'maploc1'
    };
    getLocation(locationParms1);
    locationParms2 = {
        path:'/location/2?address='+address,
        headingId:'locurl2',
        locationId:'location2',
        mapInfoId:'maploc2'
    };
    getLocation(locationParms2);

};



