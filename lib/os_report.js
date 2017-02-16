const getAvailableMemory = require('./available_memory')
const getDiskAvailable = require('./available_disk')
const getCpuAverageLoad = require('./cpu_average_load')
const getServicesStatus = require('./get_services_status')
const toTwoDecimal = (n) => Math.trunc(n*100) / 100

module.exports = function (services) {
  return Promise.all([
    getAvailableMemory(),
    getDiskAvailable(),
    getServicesStatus(services)
  ])
  .then(function (stats) {
    const [ availableMemory, availableDisk, servicesStatuses ] = stats
    return {
      memory_used: toTwoDecimal(1 - availableMemory),
      disk_used: toTwoDecimal(1 - availableDisk),
      cpu_used: toTwoDecimal(getCpuAverageLoad()),
      services: servicesStatuses
    }
  })
}
