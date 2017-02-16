const { protocol, port } = require('config')
// uses HTTPS by default
proto = require(protocol)
const fs = require('fs')
const { green, grey } = require('chalk')
const osReport = require('./lib/os_report')
const qs = require('querystring')

const server = function (req, res) {
  const services = parseServices(req.url)

  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  osReport(services)
  .then(formatData(res))
  .catch(handleError(res))
}

const parseServices = function (url) {
  const queryString = url.split('?')[1]
  var services
  if (queryString) {
    services = qs.parse(queryString).services
    if (services) services = services.split('|')
  }
  return services
}

const formatData = function (res) {
  return function (data) {
    const stringifiedData = JSON.stringify(data)
    console.log(grey(new Date().toISOString()), stringifiedData)
    res.end(stringifiedData)
  }
}

const handleError = function (res) {
  return function (err) {
    res.statusCode = 500
    const { message } = err
    res.end(JSON.stringify({ message }))
  }
}

const args = []

if (protocol === 'https') {
  const options = {
    key: fs.readFileSync('./keys/self-signed.key'),
    cert: fs.readFileSync('./keys/self-signed.crt')
  }
  args.push(options)
}

args.push(server)

proto.createServer.apply(null, args)
.listen(port)
.on('listening', () => console.log(green(`Started on ${protocol}://localhost:${port}!`)))
.on('error', console.error)
