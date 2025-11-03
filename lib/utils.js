import { exec } from 'node:child_process'
import { promisify } from 'node:util'

export const execAsync = promisify(exec)

export const toTwoDecimal = n => Math.trunc(n * 100) / 100
