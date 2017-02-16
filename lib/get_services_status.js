const { exec } = require('child_process')

module.exports = function (services) {
  if (!(services instanceof Array)) return
  return Promise.all(services.map(getServicesStatus))
  .then(statuses => {
    const statusesIndex = {}
    statuses.forEach(statusData => statusesIndex[statusData[0]] = statusData[1])
    return statusesIndex
  })
}

const getServicesStatus = function (service) {
  return new Promise(function (resolve, reject) {
    exec(`systemctl status '${service}'|grep Active`, function(err, stdout, stderr) {
      if (err) {
        reject(err)
      } else {
        const status = parseStdout(stdout)
        resolve([ service, status ])
      }
    })
  })
}

const parseStdout = function (stdout) {
  const [ spaces, label, status ] = stdout.split(/\s+/)
  return status
}
