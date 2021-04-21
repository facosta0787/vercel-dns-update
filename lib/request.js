const fetch = require('node-fetch').default

function Request(token = '') {
  return async function request(url, options) {
    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const response = await fetch(url, { ...defaultOptions, ...options })
    const data = await response.json()

    return { ...response, data }
  }
}

module.exports = Request
