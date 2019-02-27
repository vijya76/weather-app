const Request = require('./request')

class Weather {
  constructor () {
    this.client = new Request(process.env.WEATHER_API_BASE)
    this.client.addAuthInQuery('appid', process.env.WEATHER_APIKEY)
  }

  async getWeatherByCityName (city) {
    const query = { q: city }
    return this.client.get('/weather', query)
  }

  async getWeatherByGeoLocation (latitude, longitude) {
    const query = { lat: latitude, lon: longitude }
    return this.client.get('/weather', query)
  }

  async getWeatherByZip (zip, countryCode) {
    const query = { zip: `${zip},${countryCode}` }
    return this.client.get('/weather', query)
  }
}

module.exports = new Weather()
