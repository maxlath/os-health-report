const { exec } = require('child_process')

module.exports = dockerContainers => {
  if (!(dockerContainers instanceof Array)) return

  return new Promise((resolve, reject) => {
    exec('docker ps -a', (err, stdout, stderr) => {
      if (err) return reject(err)

      const containersUp = stdout
        .split('\n')
        .filter(line => line.match('Up'))
        .map(getImageName)

      const containerIds = containersUp.map(container => container.containerId)
      const imageNames = containersUp.map(container => container.imageName)

      resolve(getContainersStatuses(dockerContainers, containerIds, imageNames))
    })
  })
}

const getContainersStatuses = (dockerContainers, containerIds, imageNames) => {
  const statuses = {}

  dockerContainers.forEach(containerKey => {
    const array = isContainerId(containerKey) ? containerIds : imageNames
    const status = array.includes(containerKey) ? 'active' : 'inactive'
    statuses[containerKey] = status
  })

  return statuses
}

const getImageName = statusLine => {
  var [ containerId, imageName ] = statusLine.split(/\s+/g)
  imageName = imageName.split(':')[0]
  return { containerId, imageName }
}

const isContainerId = str => containerIdPattern.test(str)
const containerIdPattern =  /^[0-9a-f]{12}$/
