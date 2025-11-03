import { getDiskAvailable } from './available_disk.js'
import { getAvailableMemory } from './available_memory.js'
import { getCpuAverageLoad } from './cpu_average_load.js'
import { getDockerContainersStatus } from './get_docker_containers_status.js'
import { getServicesStatus } from './get_services_status.js'

const toTwoDecimal = n => Math.trunc(n * 100) / 100

export async function osReport ({ services, dockerContainers }) {
  const [
    availableMemory,
    availableDisk,
    servicesStatuses,
    dockerStatuses,
  ] = await Promise.all([
    getAvailableMemory(),
    getDiskAvailable(),
    getServicesStatus(services),
    getDockerContainersStatus(dockerContainers),
  ])
  return {
    memory_used: toTwoDecimal(1 - availableMemory),
    disk_used: toTwoDecimal(1 - availableDisk),
    cpu_used: toTwoDecimal(getCpuAverageLoad()),
    services: servicesStatuses,
    docker: dockerStatuses,
  }
}
