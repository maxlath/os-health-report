const { exec } = require('child_process')
const command = `docker ps -a | grep Up | sed 's/\\s.*//'`

module.exports = dockerContainers => {
  if (!(dockerContainers instanceof Array)) return

  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) return reject(err)
      const containersUp = stdout.split('\n')
      resolve(getContainersStatuses(dockerContainers, containersUp))
    })
  })
}

const getContainersStatuses = (dockerContainers, containersUp) => {
  const statuses = {}

  dockerContainers.forEach(containerId => {
    const status = containersUp.includes(containerId) ? 'active' : 'inactive'
    statuses[containerId] = status
  })

  return statuses
}
