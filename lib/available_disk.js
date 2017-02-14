const { diskMountPath } = require('config')
const diskspace = require('diskspace')

module.exports = function () {
  return new Promise(function (resolve, reject) {
    diskspace.check(diskMountPath, function (err, total, free, status) {
      if (err) {
        reject(err)
      } else {
        resolve(free/total)
      }
    })
  })
}
