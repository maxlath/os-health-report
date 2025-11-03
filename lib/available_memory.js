import { execAsync } from './utils.js'

// Available is larger than free memory http://www.linuxatemyram.com/
export async function getAvailableMemory () {
  const { stdout } = await execAsync('free -b |grep Mem')
  return parseCmdLine(stdout)
}

function parseCmdLine (line) {
  const [ label, total, used, free, shared, cache, available ] = line.split(/\s+/)
  return available / total
}
