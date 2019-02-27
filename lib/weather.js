const _ = require('lodash')
const Request = require('./request')

const client = new Request(process.env.WEATHER_API_BASE)
client.addAuthInQuery('appid', process.env.WEATHER_APIKEY)

class Weather {
  constructor () {
    this.query = {}
  }

  setCity (city) {
    _.assign(this.query, { q: city })
  }

  setGeoLocation (latitude, longitude) {
    _.assign(this.query, { lat: latitude, lon: longitude })
  }

  setZip (zip, countryCode) {
    _.assign(this.query, { zip: `${zip},${countryCode}` })
  }

  async getWeather () {
    return client.get('/weather', this.query)
  }
}

module.exports = Weather
