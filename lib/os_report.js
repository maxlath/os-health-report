import { getDisksAvailabilityInfo } from './available_disk.js'
import { getAvailableMemory } from './available_memory.js'
import { getCpuAverageLoad } from './cpu_average_load.js'
import { getDockerContainersStatus } from './get_docker_containers_status.js'
import { getServicesStatus } from './get_services_status.js'
import { toTwoDecimal } from './utils.js'

export async function osReport ({ services, dockerContainers }) {
  const [
    availableMemory,
    disksUsed,
    servicesStatuses,
    dockerStatuses,
  ] = await Promise.all([
    getAvailableMemory(),
    getDisksAvailabilityInfo(),
    getServicesStatus(services),
    getDockerContainersStatus(dockerContainers),
  ])
  return {
    memory_used: toTwoDecimal(1 - availableMemory),
    cpu_used: toTwoDecimal(getCpuAverageLoad()),
    disks_used: disksUsed,
    services: servicesStatuses,
    docker: dockerStatuses,
  }
}
