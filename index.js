const { port } = require('config')
const osReport = require('./lib/os_report')
const { green, grey } = require('chalk')

const server = function (req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  osReport()
  .then(formatData(res))
  .catch(handleError(res))
}

const formatData = function (res) {
  return function (data) {
    console.log(grey(new Date().toISOString()), data)
    res.end(JSON.stringify(data))
  }
}

const handleError = function (res) {
  return function (err) {
    res.statusCode = 500
    const { message } = err
    res.end(JSON.stringify({ message }))
  }
}

require('http').Server(server).listen(port)

console.log(green(`Started on port ${port}!`))
