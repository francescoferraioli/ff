import { logArray } from './console.js';
import { FF_PATH } from './constants.js';
import { getDirectories } from './fs.js';

export function isHelp(x) {
	return ["-h", "--help"].includes(x)
}

export function listObjects() {
  logArray(getDirectories(FF_PATH))
}
