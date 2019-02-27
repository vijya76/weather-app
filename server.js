// Load Configurations
require('dotenv').config()

const _ = require('lodash')
const logger = require('./lib/logger')
const Weather = require('./lib/weather')

async function getWeather (city, longitude, latitude) {
  const weather = new Weather()
  weather.setCity(city)
  weather.setGeoLocation(longitude, latitude)
  return weather.getWeather()
}

function _print (heading, params) {
  logger.info('=========================')
  logger.info(heading)
  logger.info('=========================')
  _.forEach(params, (value, param) => {
    logger.info(`${param}: ${value}`)
  })
  logger.info('=========================')
}

function printWind (response) {
  _print('Wind', {
    'Speed': response.wind.speed,
    'Degree': response.wind.deg
  })
}

function printWeatherDetails (response) {
  _print('Weather', {
    'Temperature': response.main.temp,
    'Pressure': response.main.pressure,
    'Humidity': response.main.humidity,
    'Minimum Temperature': response.main.temp_min,
    'Maximum Temperature': response.main.temp_max
  })
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
