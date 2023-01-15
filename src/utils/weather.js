const request = require("request");

// weather request as function to be used as seperate module

const weather = (latitude, longitude, callback) =>  {

    const weatherURL = "http://api.weatherstack.com/current?access_key=034ccde75e01a049b71fba30ed625439&query=" + latitude + "," + longitude;

    request({url : weatherURL, json : true}, (error, response) => {

        if (error) {
            callback("Unable to connect to weather service!", undefined);
        }
        else if (response.body.error) {
            callback("Unable to find the location. try with right coordinates", undefined);
        }
        else {
            const weatherData = {
                weatherDescription : response.body.current.weather_descriptions[0], 
                temperature : response.body.current.temperature,
                feelslike : response.body.current.feelslike
            }
            callback(undefined, weatherData)
        }   
    })
}

//export weather module
module.exports = weather;