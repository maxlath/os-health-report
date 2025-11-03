import { execAsync } from './utils.js'

export async function getDockerContainersStatus (dockerContainers) {
  if (!(dockerContainers instanceof Array)) return

  const { stdout } = await execAsync('docker ps -a')
  const containersUp = stdout
      .split('\n')
      .filter(line => line.match('Up'))
      .map(getImageName)

  const containerIds = containersUp.map(container => container.containerId)
  const imageNames = containersUp.map(container => container.imageName)

  return getContainersStatuses(dockerContainers, containerIds, imageNames)
}

function getContainersStatuses (dockerContainers, containerIds, imageNames) {
  const statuses = {}

  dockerContainers.forEach(containerKey => {
    const array = isContainerId(containerKey) ? containerIds : imageNames
    const status = array.includes(containerKey) ? 'active' : 'inactive'
    statuses[containerKey] = status
  })

  return statuses
}

function getImageName (statusLine) {
  let [ containerId, imageName ] = statusLine.split(/\s+/g)
  imageName = imageName.split(':')[0]
  return { containerId, imageName }
}

const isContainerId = str => containerIdPattern.test(str)
const containerIdPattern = /^[0-9a-f]{12}$/
