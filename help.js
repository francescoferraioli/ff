import { logArray } from './console.js';
import { FF_PATH, FF_OBJECT } from './constants.js';
import { getDirectories, getFiles, pathJoin } from './fs.js';

export function isHelp(x) {
	return ["-h", "--help"].includes(x)
}

export function listObjects() {
  logArray(getDirectories(FF_PATH))
}

export function listActions() {
  logArray(getFiles(pathJoin(FF_PATH, FF_OBJECT)))
}
