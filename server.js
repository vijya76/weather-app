// Load Configurations
require('dotenv').config()

const _ = require('lodash')
const Weather = require('./lib/weather')

async function getWeather (city, longitude, latitude) {
  const weather = new Weather()
  weather.setCity(city)
  weather.setGeoLocation(longitude, latitude)
  return weather.getWeather()
}

function _print (heading, params) {
  console.log('=========================')
  console.log(heading)
  console.log('=========================')
  _.forEach(params, (value, param) => {
    console.log(`${param}: ${value}`)
  })
  console.log('=========================')
}

function printWind (response) {
  const { speed, deg } = response.wind
  _print('Wind', { 'Speed': speed, 'Degree': deg })
}

function printWeatherDetails (response) {
  const { temp, pressure, humidity, temp_min, temp_max } = response.main
  _print('Weather', { 'Temperature': temp, 'Pressure': pressure, 'Humidity': humidity, 'Minimum Temperature': temp_min, 'Maximum Temperature': temp_max })
}

function printResponse (response) {
  printWind(response)
  printWeatherDetails(response)
}

getWeather('Denver', -104.8, 39.74)
  .then(printResponse)
  .catch(error => {
    _print('An Error Occurred.', { 'Description': error.message })
  })
