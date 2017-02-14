const getAvailableMemory = require('./available_memory')
const getDiskAvailable = require('./available_disk')
const getCpuAverageLoad = require('./cpu_average_load')
const toTwoDecimal = (n) => Math.trunc(n*100) / 100

module.exports = function () {
  return Promise.all([
    getAvailableMemory(),
    getDiskAvailable()
  ])
  .then(function (stats) {
    const [ availableMemory, availableDisk ] = stats
    return {
      memory_used: toTwoDecimal(1 - availableMemory),
      disk_used: toTwoDecimal(1 - availableDisk),
      cpu_used: toTwoDecimal(getCpuAverageLoad())
    }
  })
}
