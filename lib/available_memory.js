const { exec } = require('child_process')

// Available is larger than free memory http://www.linuxatemyram.com/
module.exports = () => {
  return new Promise((resolve, reject) => {
    exec('free -b |grep Mem', (err, stdout, stderr) => {
      if (err) reject(err)
      else resolve(parseCmdLine(stdout))
    })
  })
}

const parseCmdLine = line => {
  const [ label, total, used, free, shared, cache, available ] = line.split(/\s+/)
  return available / total
}
