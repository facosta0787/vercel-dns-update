require('dotenv').config()
const format  = require('date-fns/fp/format').default
const request = require('./lib/request')(process.env.TOKEN);
const argv    = require('process.argv')(process.argv.slice(2));

const config = argv({ update: true, domain: null, records: '' });

async function app() {
  const { domain } = config;
  const records = config.records.includes(',') ? config.records.split(',') : [config.records];

  if (!domain || records.length < 0) {
    console.error('Error: You must to supply a domain and at least one record');
    process.exit(1);
  }

  try {
    const { data } = await request('https://api.myip.com');
    const publicIp = data.ip;
    const responses = await Promise.all(records.map(record => updateRecord(domain, record, publicIp)));
    console.log(format('yyyy-MM-dd HH:mm:ss')(new Date()) + '\n  ' + responses.join('\n  '));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function updateRecord(domainName, recordName, ip) {
  const baseURL = 'https://api.vercel.com';
  const dnsListPath = baseURL + '/v4/domains/:domain/records'.replace(/:domain/gi, domainName);
  const dnsRemovePath = baseURL + '/v2/domains/:domain/records/:recId'.replace(/:domain/gi, domainName);
  const dnsCreatePath = baseURL + '/v2/domains/:domain/records'.replace(/:domain/gi, domainName);
  const { data } = await request(dnsListPath);
  const record = data.records.find(dnsRecord => dnsRecord.name === recordName);

  if (record && record.value === ip) {
    return `Info: Record ${recordName}@${domainName} is already up to date with ip ${ip}`;
  }

  if (record) {
    await request(dnsRemovePath.replace(/:recId/gi, record.id), {
      method: 'DELETE'
    });
  }

  const body = {
    name: recordName,
    type: 'A',
    value: ip,
    ttl: 60
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(body)
  };
  const {
    data: {
      uid
    }
  } = await request(dnsCreatePath, options);

  if (uid) {
    return `Info: Record ${recordName}@${domainName} ${record ? 'updated' : 'created'} successfully with ip address ${ip}`;
  }
}

app();
