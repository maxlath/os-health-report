import config from 'config'
import { execAsync } from './utils.js'

const { diskMountPath } = config

export async function getDiskAvailable () {
  const { stdout } = await execAsync(`df -k '${diskMountPath}'`)
  const { total, free } = parseStdout(stdout)
  return free / total
}

// Parsing copied from 'diskspace' module
// https://github.com/keverw/diskspace.js/blob/master/diskspace.js#L74-L83
function parseStdout (stdout) {
  const lines = stdout.trim().split('\n')
  const str_disk_info = lines[lines.length - 1].replace(spacesPattern, ' ')
  const disk_info = str_disk_info.split(' ')
  return {
    total: disk_info[1] * 1024,
    free: disk_info[3] * 1024,
  }
}

const spacesPattern = /[\s\n\r]+/g
