const heapdump = require('heapdump')

const writeSnapshot = function () {
  const path = './heapsnapshot/' + new Date().toISOString() + '.heapsnapshot'
  heapdump.writeSnapshot(path, function (err, filename) {
    console.log('dump written to', filename)
  })
}

module.exports = function (periodicity) {
  console.log('heap snapshots enabled. Periodicity: ', periodicity)
  setInterval(writeSnapshot, periodicity)
}
