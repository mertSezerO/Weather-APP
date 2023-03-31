const express = require('express');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
    res.render('index.html')
})

app.post('/', (req, res) => {
    const endpoint = 'http://api.openweathermap.org/data/2.5/weather?'
    const city = 'q=' + req.body.city
    const key = 'APPID=3e89ae0c8c016e649bb1b3938347fb40'
    const units = 'units=metric'
    const url = endpoint + city + '&' + key + '&' + units
    let weatherData
    https.get(url, (resp) => {
        resp.on('data', (data) => {
            weatherData = JSON.parse(data)
        })
    })
    res.render('response.html', {temp: weatherData.main.temp, desc: weatherData.weather.description, wind: weatherData.wind.speed})
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})