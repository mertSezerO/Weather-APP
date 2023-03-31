const express = require('express');
const https = require('https');
const engine = require('consolidate')

const app = express();

/*app.set('views', __dirname + '/public/Views')
app.engine('html', engine.mustache)
app.set('view-engine', 'html')
app.use('/public', express.static('public'))*/

app.set('views', __dirname + '/public/Views')
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/', (req, res) => {
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather?'
    const city = 'q=' + req.body.city
    const key = 'APPID=3e89ae0c8c016e649bb1b3938347fb40'
    const units = 'units=metric'
    const url = endpoint + city + '&' + key + '&' + units
    https.get(url, (resp) => {
        resp.on('data', (data) => {
            const weatherData = JSON.parse(data)
            res.render('response.ejs', {temp: weatherData.main.temp, desc: weatherData.weather[0].description, wind: weatherData.wind.speed, city: weatherData.name})
        })
    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})