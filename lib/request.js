const _ = require('lodash')
const request = require('request-promise')

class Request {
  constructor (uribase, defaultHeaders) {
    this.base = uribase
    this.headers = defaultHeaders
    this.query = {}
  }

  addAuthInQuery (param, value) {
    _.assign(this.query, { [ param ]: value })
  }

  addAuthInHeader (key, basic = false) {
    const type = basic ? 'Basic' : 'Bearer'
    this.query.assign({ 'Authentication': `${type} ${key}` })
  }

  async get (uri, query, headers) {
    let rq = this._prepareRequest('GET', uri, query, headers, true)
    return this._call(rq)
  }

  async post (uri, body, query, headers) {
    let rq = this._prepareRequest('POST', uri, query, headers, body)
    return this._call(rq)
  }

  async put (uri, body, query, headers) {
    let rq = this._prepareRequest('PUT', uri, query, headers, body)
    return this._call(rq)
  }

  async patch (uri, body, query, headers) {
    let rq = this._prepareRequest('PATCH', uri, query, headers, body)
    return this._call(rq)
  }

  async delete (uri, query, headers) {
    let rq = this._prepareRequest('DELETE', uri, query, headers, true)
    return this._call(rq)
  }

  _prepareRequest (method, uri = {}, query = {}, heads = {}, json) {
    _.assign(query, this.query)
    let url = this._getURL(uri, query); let headers = this._getHeaders(heads)
    let requestObj = { method, url, headers }
    const body = headers['Content-Type'] === 'application/x-www-form-urlencoded' ? { 'form': json } : { json }
    _.assign(requestObj, body)
    return requestObj
  }

  _getHeaders (headers) {
    return _.assign(headers, this.headers)
  }

  _getURL (uri, query) {
    return `${this.base}${uri}?${this._getQueryString(query)}`
  }

  _getQueryString (options) {
    return _.map(options, (value, key) => `${key}=${encodeURIComponent(value)}`).join('&')
  }

  async _call (rq) {
    return request(rq)
  }
}

module.exports = Request
