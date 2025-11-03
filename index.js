import fs from 'node:fs'
import http from 'node:http'
import https from 'node:https'
import qs from 'node:querystring'
import config from 'config'
import { green, grey } from 'tiny-chalk'
import { osReport } from './lib/os_report.js'

const { protocol, port } = config
const proto = protocol === 'http' ? http : https

function server (req, res) {
  const queryData = parseQuery(req.url)

  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  osReport(queryData)
  .then(formatData(res))
  .catch(handleError(res))
}

function parseQuery (url) {
  const queryString = url.split('?')[1]
  const data = {}
  if (queryString) {
    const { services, docker } = qs.parse(queryString)
    if (services) data.services = services.split('|')
    if (docker) data.dockerContainers = docker.split('|')
  }
  return data
}

const formatData = res => data => {
  const stringifiedData = JSON.stringify(data)
  console.log(grey(new Date().toISOString()), stringifiedData)
  res.end(stringifiedData)
}

const handleError = res => err => {
  res.statusCode = 500
  const { message } = err
  res.end(JSON.stringify({ message }))
}

const args = []

if (protocol === 'https') {
  const options = {
    key: fs.readFileSync('./keys/self-signed.key'),
    cert: fs.readFileSync('./keys/self-signed.crt'),
  }
  args.push(options)
}

args.push(server)

proto.createServer.apply(null, args)
.listen(port)
.on('listening', () => console.log(green(`Started on ${protocol}://localhost:${port}!`)))
.on('error', console.error)
