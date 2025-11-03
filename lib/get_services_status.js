import { execAsync } from './utils.js'

export async function getServicesStatus (services) {
  if (!(services instanceof Array)) return
  const statuses = await Promise.all(services.map(getServiceStatus))
  const statusesIndex = {}
  statuses.forEach(statusData => statusesIndex[statusData[0]] = statusData[1])
  return statusesIndex
}

async function getServiceStatus (service) {
  const { stdout } = await execAsync(`systemctl status '${service}'|grep Active`)
  const status = parseStdout(stdout)
  return [ service, status ]
}

function parseStdout (stdout) {
  const [ spaces, label, status ] = stdout.split(/\s+/)
  return status
}
