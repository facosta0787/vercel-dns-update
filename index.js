require('dotenv').config()
const format       = require('date-fns/fp/format').default
const request      = require('./lib/request')(process.env.TOKEN)
const argv         = require('process.argv')(process.argv.slice(2))
const updateRecord = require('./lib/update-record')

const config = argv({ update: true, domain: null, records: '' })

async function app() {
  const { domain } = config
  const records = config.records.includes(',') ? config.records.split(',') : [config.records]

  if (!domain || records.length < 0) {
    console.error('Error: You must to supply a domain and at least one record')
    process.exit(1)
  }

  try {
    const { data } = await request('https://api.myip.com')
    const publicIp = data.ip
    const responses = await Promise.all(records.map(record => updateRecord(domain, record, publicIp)))
    console.log(format('yyyy-MM-dd HH:mm:ss')(new Date()) + '\n  ' + responses.join('\n  '))
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

app()
