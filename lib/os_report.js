const getAvailableMemory = require('./available_memory')
const getDiskAvailable = require('./available_disk')
const getCpuAverageLoad = require('./cpu_average_load')
const getServicesStatus = require('./get_services_status')
const getDockerContainersStatus = require('./get_docker_containers_status')
const toTwoDecimal = n => Math.trunc(n * 100) / 100

module.exports = ({ services, dockerContainers}) => {
  return Promise.all([
    getAvailableMemory(),
    getDiskAvailable(),
    getServicesStatus(services),
    getDockerContainersStatus(dockerContainers)
  ])
  .then(([ availableMemory, availableDisk, servicesStatuses, dockerStatuses]) => {
    return {
      memory_used: toTwoDecimal(1 - availableMemory),
      disk_used: toTwoDecimal(1 - availableDisk),
      cpu_used: toTwoDecimal(getCpuAverageLoad()),
      services: servicesStatuses,
      docker: dockerStatuses
    }
  })
}
