const request = require('./request')(process.env.TOKEN)

async function updateRecord(domainName, recordName, ip) {
  const baseURL = 'https://api.vercel.com'
  const dnsListPath = baseURL + '/v4/domains/:domain/records'.replace(/:domain/gi, domainName)
  const dnsRemovePath = baseURL + '/v2/domains/:domain/records/:recId'.replace(/:domain/gi, domainName)
  const dnsCreatePath = baseURL + '/v2/domains/:domain/records'.replace(/:domain/gi, domainName)
  const { data } = await request(dnsListPath)

  if(data.error) {
    console.error(`🚫 ${data.error.code} | ${data.error.message}`)
    process.exit(1)
  }

  const record = data.records.find(dnsRecord => dnsRecord.name === recordName)


  if (record && record.value === ip) {
    return `Info: Record ${recordName}@${domainName} is already up to date with ip ${ip}`
  }

  if (record) {
    await request(dnsRemovePath.replace(/:recId/gi, record.id), {
      method: 'DELETE'
    })
  }

  const body = {
    name: recordName,
    type: 'A',
    value: ip,
    ttl: 60
  }
  const options = {
    method: 'POST',
    body: JSON.stringify(body)
  }
  const {
    data: {
      uid
    }
  } = await request(dnsCreatePath, options)

  if (uid) {
    return `Info: Record ${recordName}@${domainName} ${record ? 'updated' : 'created'} successfully with ip address ${ip}`
  }
}

module.exports = updateRecord
