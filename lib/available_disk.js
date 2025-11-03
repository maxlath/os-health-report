import config from 'config'
import { execAsync, toTwoDecimal } from './utils.js'

const { disksMountPaths } = config

export async function getDisksAvailabilityInfo () {
  const { stdout } = await execAsync(`df -k ${disksMountPaths.join(' ')}`)
  return parseStdout(stdout).reduce((index, { mountedAt, diskUsed }) => {
    index[mountedAt] = diskUsed
    return index
  }, {})
}

// Parsing copied from 'diskspace' module
// https://github.com/keverw/diskspace.js/blob/master/diskspace.js#L74-L83
function parseStdout (stdout) {
  const lines = stdout.trim().split('\n').slice(1)
  return lines.map(line => {
    const strDiskInfo = line.replace(spacesPattern, ' ')
    const diskInfo = strDiskInfo.split(' ')
    const total = diskInfo[1] * 1024
    const free = diskInfo[3] * 1024
    return {
      mountedAt: diskInfo[5],
      diskUsed: toTwoDecimal(1 - (free / total)),
    }
  })
}

const spacesPattern = /[\s\n\r]+/g
