import { FF_PATH } from './constants.js';
import { exec } from './exec.js';

export function isHelp(x) {
	return ["-h", "--help"].includes(x)
}

export async function listObjects() {
  await exec(`ls -1 ${FF_PATH}`)
}