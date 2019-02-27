/* global it, describe */
const chai = require('chai')
const Weather = require('../lib/weather')

describe('Weather Library', function () {
  describe('#getWeatherByCityName', function () {
    it('City Not Found', async function () {
      try {
        const city = 'Colarado'
        const weather = new Weather()
        weather.setCity(city)
        await weather.getWeather()
      } catch (err) {
        chai.expect(err.response.body).to.be.a('object')
        chai.expect(err.response.body).to.have.all.keys('message', 'cod')
        chai.expect(err.response.body.cod).to.equal('404')
        chai.expect(err.response.body.message).to.equal('city not found')
      }
    })

    it('Success', async function () {
      const city = 'London'
      const weather = new Weather()
      weather.setCity(city)
      const data = await weather.getWeather()
      chai.expect(data).to.be.a('object')
      chai.expect(data).to.have.all.keys('coord', 'weather', 'base', 'main', 'visibility', 'wind', 'clouds', 'dt', 'sys', 'id', 'name', 'cod')
      chai.expect(data.coord).to.be.a('object')
      chai.expect(data.coord).to.have.all.keys('lon', 'lat')
      chai.expect(data.coord.lon).to.equal(-0.13)
      chai.expect(data.coord.lat).to.equal(51.51)
      chai.expect(data.wind).to.be.a('object')
      chai.expect(data.wind).to.have.all.keys('speed')
      chai.expect(data.wind.speed).to.equal(0.5)
    })
  })

  describe('#getWeatherByGeoLocation', function () {
    it('Location Invalid', async function () {
      try {
        const latitude = 100000
        const longitude = -107.7934273
        const weather = new Weather()
        weather.setGeoLocation(latitude, longitude)
        await weather.getWeather()
      } catch (err) {
        chai.expect(err.response.body).to.be.a('object')
        chai.expect(err.response.body).to.have.all.keys('message', 'cod')
        chai.expect(err.response.body.cod).to.equal('400')
        chai.expect(err.response.body.message).to.equal('100000 is not a float')
      }
    })

    it('Success', async function () {
      const latitude = 38.9764608
      const longitude = -107.7934273
      const weather = new Weather()
      weather.setGeoLocation(latitude, longitude)
      const data = await weather.getWeather()
      chai.expect(data).to.be.a('object')
      chai.expect(data).to.have.all.keys('coord', 'weather', 'base', 'main', 'visibility', 'wind', 'clouds', 'dt', 'sys', 'id', 'name', 'cod')
      chai.expect(data.coord).to.be.a('object')
      chai.expect(data.coord).to.have.all.keys('lon', 'lat')
      chai.expect(data.coord.lon).to.equal(-107.79)
      chai.expect(data.coord.lat).to.equal(38.98)
      chai.expect(data.wind).to.be.a('object')
      chai.expect(data.wind).to.have.all.keys('speed', 'deg')
      chai.expect(data.wind.speed).to.equal(1.5)
      chai.expect(data.wind.deg).to.equal(50)
    })
  })

  describe('#getWeatherByZip', function () {
    it('City Not Found', async function () {
      try {
        const zipCode = 284002
        const region = 'us'
        const weather = new Weather()
        weather.setZip(zipCode, region)
        await weather.getWeather()
      } catch (err) {
        chai.expect(err.response.body).to.be.a('object')
        chai.expect(err.response.body).to.have.all.keys('message', 'cod')
        chai.expect(err.response.body.cod).to.equal('404')
        chai.expect(err.response.body.message).to.equal('city not found')
      }
    })

    it('Success', async function () {
      const zipCode = 80011
      const region = 'us'
      const weather = new Weather()
      weather.setZip(zipCode, region)
      const data = await weather.getWeather()
      chai.expect(data).to.be.a('object')
      chai.expect(data).to.have.all.keys('coord', 'weather', 'base', 'main', 'visibility', 'wind', 'clouds', 'dt', 'sys', 'id', 'name', 'cod')
      chai.expect(data.coord).to.be.a('object')
      chai.expect(data.coord).to.have.all.keys('lon', 'lat')
      chai.expect(data.coord.lon).to.equal(-104.8)
      chai.expect(data.coord.lat).to.equal(39.74)
      chai.expect(data.wind).to.be.a('object')
      chai.expect(data.wind).to.have.all.keys('speed', 'deg')
      chai.expect(data.wind.speed).to.equal(3.6)
      chai.expect(data.wind.deg).to.equal(90)
    })
  })
})
