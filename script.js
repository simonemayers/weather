// import fetch from "node-fetch"; 

// let latitude; 
// let longitude;
// function getCoords(position) {
//     return {latitude, longitude} = position.coords
// }
// function getPosition () {
//     return navigator.geolocation.getCurrentPosition(getCoords)
// }

// function getGeoWeather(){
//     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=0f694359e25ccf590bb71af57cb9504d`)
//     .then(res => res.json())
//     .then(data => console.log(data))
// }

// getPosition()
// getGeoWeather()
let searchButton = document.querySelector(".search-button")
let city = document.querySelector(".city")
let temp = document.querySelector(".temp")
let searchBar = document.querySelector(".search-bar")
let weatherDescription = document.querySelector(".description")
let humidity = document.querySelector(".humidity")
let wind = document.querySelector(".wind")
let icon = document.querySelector("#icon")
function displayWeather(){
    city.innerHTML = `Weather in ${data.name}`
    temp.innerHTML = `${Math.round(data.main.temp)}°F`

    let description = data.weather[0].description.split(" ")
    let descriptionCaps = []
    description.map(w => {
        first = w.slice(0, 1).toUpperCase()
        rest = w.slice(1)
        caps = first+rest
        descriptionCaps.push(caps)
    })
    weatherDescription.innerHTML = `${descriptionCaps.join(" ")}`

    humidity.innerHTML = `Humidity: ${data.main.humidity}%`
    
    wind.innerHTML = `Wind Speed: ${Math.round(data.wind.speed)} mph`
    
    switch(data.weather[0].main){
        case "Clouds": 
            icon.className = "bi bi-clouds"
            break;
        case "Haze": 
            icon.className = "bi bi-cloud-haze2"
            break;
        case "Clear": 
            icon.className = "bi bi-brightness-high"; 
            break;
        case "Rain": 
            icon.className = "bi bi-cloud-drizzle"; 
            break;
        case "Snow": 
            icon.className = "bi bi-snow"; 
            break;
    }
}
function getGeoWeatherByZip() {
    let zip = document.querySelector(".search-input").value
    if(zip.length === 5 && parseInt(zip) == zip){
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=0f694359e25ccf590bb71af57cb9504d&units=imperial`)
        .then(res => res.json())
        .then(data => {
            city.innerHTML = `Weather in ${data.name}`
            temp.innerHTML = `${Math.round(data.main.temp)}°F`
    
            let description = data.weather[0].description.split(" ")
            let descriptionCaps = []
            description.map(w => {
                first = w.slice(0, 1).toUpperCase()
                rest = w.slice(1)
                caps = first+rest
                descriptionCaps.push(caps)
            })
            weatherDescription.innerHTML = `${descriptionCaps.join(" ")}`
    
            humidity.innerHTML = `Humidity: ${data.main.humidity}%`
    
            wind.innerHTML = `Wind Speed: ${Math.round(data.wind.speed)} mph`
            
            document.querySelector(".low").innerHTML = `${Math.round(data.main.temp_min)}°F`
            document.querySelector(".high").innerHTML = `${Math.round(data.main.temp_max)}°F`

            document.querySelector(".feels-like").innerHTML = `Feels Like: ${Math.round(data.main.feels_like)}°F`
            console.log(data)
            console.log(data.main.feels_like)

            switch(data.weather[0].main){
                case "Clouds": 
                    icon.className = "bi bi-clouds"
                    break;
                case "Haze": 
                    icon.className = "bi bi-cloud-haze2"
                    break;
                case "Clear": 
                    icon.className = "bi bi-brightness-high"; 
                    break;
                case "Rain": 
                    icon.className = "bi bi-cloud-drizzle"; 
                    break;
                case "Snow": 
                    icon.className = "bi bi-snow"; 
                    break;
    
            }
        })

    } else{
        document.querySelector(".search-input").value = "Please enter a valid Zip Code"
    }
}


searchButton.addEventListener("click", getGeoWeatherByZip)
searchBar.addEventListener("keyup", (e) => {
    if(e.key=== "Enter"){
        getGeoWeatherByZip()
    }
} )

let locationButton = document.querySelector(".location-button")
let latitude; 
let longitude;
function getCoords(position) {
    return {latitude, longitude} = position.coords
}
function getPosition () {
    return navigator.geolocation.getCurrentPosition(getCoords)
}
locationButton.addEventListener("click", (e) => {
    // console.log(e.target)
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=0f694359e25ccf590bb71af57cb9504d&units=imperial`)
        .then(res => res.json())
        .then(data => {
            // city.innerHTML = `Weather in ${data.name}`
            temp.innerHTML = `${Math.round(data.current.temp)}°F`
            console.log(data)
            let description = data.current.weather[0].description.split(" ")
            let descriptionCaps = []
            description.map(w => {
                first = w.slice(0, 1).toUpperCase()
                rest = w.slice(1)
                caps = first+rest
                descriptionCaps.push(caps)
            })
            weatherDescription.innerHTML = `${descriptionCaps.join(" ")}`
    
            humidity.innerHTML = `Humidity: ${data.current.humidity}%`
    
            wind.innerHTML = `Wind Speed: ${Math.round(data.current.wind_speed)} mph`
    
            switch(data.current.weather[0].main){
                case "Clouds": 
                    icon.className = "bi bi-clouds"
                    break;
                case "Haze": 
                    icon.className = "bi bi-cloud-haze2"
                    break;
                case "Clear": 
                    icon.className = "bi bi-brightness-high"; 
                    break;
                case "Rain": 
                    icon.className = "bi bi-cloud-drizzle"; 
                    break;
                case "Snow": 
                    icon.className = "bi bi-snow"; 
                    break;
    
            }
            let feelsLike = document.querySelector(".feels-like")
            feelsLike.innerHTML = `Feels like: ${Math.round(data.current.feels_like)}°F`

            let low = document.querySelector(".low")
            let high = document.querySelector(".high")
            low.innerHTML = `${Math.round(data.daily[0].temp.min)}°F`
            high.innerHTML = `${Math.round(data.daily[0].temp.max)}°F`
            console.log("it works")
            
            fetch(`http://api.geonames.org/findNearestAddressJSON?lat=${data.lat}&lng=${data.lon}&username=simone.mayers`)
            .then(res => res.json())
            .then(data => city.innerHTML = `Weather in ${data.address.placename}`)
        })
})

getPosition()

document.querySelector(".time").innerHTML = `${new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric", time:"long"})} ${new Date().toLocaleTimeString([], {hour: "numeric", minute:"numeric"})}`
