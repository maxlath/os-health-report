const os = require('os')

module.exports = function () {
  // Return the five minutes average load
  // https://nodejs.org/api/os.html#os_os_loadavg
  return os.loadavg()[1] / os.cpus().length
}
