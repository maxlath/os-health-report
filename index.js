const { protocol, port } = require('config')
// uses HTTPS by default
proto = require(protocol)
const fs = require('fs')
const { green, grey } = require('chalk')
const osReport = require('./lib/os_report')
const qs = require('querystring')

const server = function (req, res) {
  const queryData = parseQuery(req.url)

  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  osReport(queryData)
  .then(formatData(res))
  .catch(handleError(res))
}

const parseQuery = function (url) {
  const queryString = url.split('?')[1]
  const data = {}
  if (queryString) {
    const { services, docker } = qs.parse(queryString)
    if (services) data.services = services.split('|')
    if (docker) data.dockerContainers = docker.split('|')
  }
  return data
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
