console.log("client side javascript file is loaded");

//window.alert("alert from javascript");

// fetch option will work only in client side javascript and NOT on nodejs

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=chennai').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log("Error ", error )
//         }
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector("form")

const search = document.querySelector("input")

const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""    

    // used for local host
    // const fetchUrl = "http://localhost:3000/weather?address=" + location

    // used for prod deployment like heroku surver
    const fetchUrl = "/weather?address=" + location

    fetch(fetchUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location + ", " + data.country
                messageTwo.textContent = data.forecast
            }
        })
    })
})