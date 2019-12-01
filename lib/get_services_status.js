const { exec } = require('child_process')

module.exports = services => {
  if (!(services instanceof Array)) return
  return Promise.all(services.map(getServicesStatus))
  .then(statuses => {
    const statusesIndex = {}
    statuses.forEach(statusData => statusesIndex[statusData[0]] = statusData[1])
    return statusesIndex
  })
}

const getServicesStatus = service => {
  return new Promise((resolve, reject) => {
    exec(`systemctl status '${service}'|grep Active`, (err, stdout, stderr) => {
      if (err) return reject(err)
      const status = parseStdout(stdout)
      resolve([ service, status ])
    })
  })
}

const parseStdout = stdout => {
  const [ spaces, label, status ] = stdout.split(/\s+/)
  return status
}
