const os = require('os')

module.exports = function () {
  // Return the 15 minutes average load
  // https://nodejs.org/api/os.html#os_os_loadavg
  // Understand load average:
  // http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages
  return os.loadavg()[2] / os.cpus().length
}
