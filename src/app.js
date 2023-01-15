const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const weather = require("./utils/weather")
const { registerHelper } = require("hbs")

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Set up handlebars engine nad views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

// render handlebar index.hbs file for home page with dynamic content
app.get("/", (req, res) => {
    res.render("index", {
        title : "Weather",
        name : "TM Robo"
    })
})

// render handlebar about.hbs file for about page
app.get("/about", (req, res) => {
    res.render("about", {
        title : "About",
        name : "TM Robo"
    })
})

// render handlebar help.hbs file for help page
app.get("/help", (req, res) => {
    res.render("help", {
        title : "Help",
        name : "TM Robo",
        message : "This App is created to get the forecast for the given location"
    })
})

// render handlrbar 
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : "You must provide an address"
        })
    }

    const userLocation = req.query.address;

    // call geocode api
    geocode(userLocation, (error, geocodeData) => {
        if (error) {
            return res.send({
                error : error
            })
        }
        // call weather api
        weather(geocodeData.latitude, geocodeData.longitude, (error, weatherData) => {
            if (error) {
                return res.send({
                    error : error
                })
            }

            const forecast = `${weatherData.weatherDescription}. It is currently ${weatherData.temperature} degrees out. It feels like ${weatherData.feelslike} degress out.`;
            res.send({
                forecast : forecast,
                location : geocodeData.name,
                country : geocodeData.country
            })
            //console.log(`${geocodeData.name}, ${geocodeData.country}`);
            //console.log(`${weatherData.weatherDescription}. It is currently ${weatherData.temperature} degrees out. It feels like ${weatherData.feelslike} degress out.`);
        })
    })
    // res.send({
    //     forecast: "Sunny",
    //     location: "Chennai, India",
    //     address : req.query.address
    // })
})

// render handlrbar 
app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error : "You must provide a search term"
        })
    }
    console.log(req.query)
    console.log(req.query.search)
    res.send({
        products : []
    })
})

// render handlebar notfound.hbs file for page not found
app.get("/help/*", (req, res) => {
    res.render("404",{
        title : 404,
        name : "TM Robo",
        errorMessage : "Help article not found."
    })
})

// render handlebar notfound.hbs file for page not found
app.get("*", (req, res) => {
    res.render("404",{
        title : 404,
        name : "TM Robo",
        errorMessage : "Page not found."
    })
})

app.listen(3000, () => {
    console.log("Server listening at port 3000...")
})