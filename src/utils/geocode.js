const request = require("request");

// geocode request as fuction to be used as seperate module

const geocode = (address, callback) => {
    const geocodeURL = "http://api.positionstack.com/v1/forward?access_key=76b67a25b9d037287dc27824bb59485b&query=" + encodeURIComponent(address) + "&limit=1";

    request({url : geocodeURL, json : true}, (error, response) => {
    
        if (error) {
            callback("Unable to connect to location services!", undefined);
        }
        else if (response.body.error) {
            callback("Unable to find the location. Try another search.", undefined);
        }
        else {
            const geocodeData = {
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                name: response.body.data[0].name,
                country: response.body.data[0].country
            }
            callback(undefined, geocodeData);
        } 
    })
}

//export the geocode module
module.exports = geocode;