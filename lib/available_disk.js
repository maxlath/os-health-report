const { diskMountPath } = require('config')
const { exec } = require('child_process')

module.exports = function () {
  return new Promise(function (resolve, reject) {
    exec(`df -k '${diskMountPath}'`, function(err, stdout, stderr) {
      if (err) {
        reject(err)
      } else {
        const { total, free } = parseStdout(stdout)
        resolve(free/total)
      }
    })
  })
}

// Parsing copied from 'diskspace' module
// https://github.com/keverw/diskspace.js/blob/master/diskspace.js#L74-L83
const parseStdout = (stdout) => {
  const lines = stdout.trim().split('\n')
  const str_disk_info = lines[lines.length - 1].replace( /[\s\n\r]+/g,' ')
  const disk_info = str_disk_info.split(' ')
  return {
    total: disk_info[1] * 1024,
    free: disk_info[3] * 1024
  }
}
