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

const getLocation = (url,locElemId,label,mapElemId) => {
    axios.get(url)
        .then(
            result => {
                //console.log(result);
                //console.log(result.data);
                let locElem = document.getElementById(locElemId);
                let url = result.data.url;
                let adr = result.data.address;
                let lat = result.data.location.lat;
                let lng = result.data.location.lng;
                let msg = result.data.msg;
                let error = result.data.error;
                let output;
                if (error) { output = error;}
                else if(msg) { output = msg;}
                else if (lat && lng) {
                    output = url + '<br/>' + adr + '<br/>' + lat + ' , ' + lng;
                    getMap(lat,lng,mapElemId);
                }
                locElem.innerHTML = '<p>' + label + ' : ' + output + '</p>';
            }
        )
        .catch(
            error => {
                //console.log(error);
                location.innerHTML = '<p>' + error + '</p>';
            }
        );

};

// eslint-disable-next-line no-unused-vars
const doLocation = (event,obj) => {
    //console.log(obj.value);
    if (obj.value.length < 2 || event.code != 'Enter') {
        return;
    }
    document.getElementById('location1').innerHTML = '';
    document.getElementById('location2').innerHTML = '';
    document.getElementById('maploc1').innerHTML = '';
    document.getElementById('maploc2').innerHTML = '';
    const address = encodeURI(obj.value);
    getLocation('/location/1?address='+address,'location1','Location Service 1','maploc1');
    getLocation('/location/2?address='+address,'location2','Location Service 2','maploc2');

};



