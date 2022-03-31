import { logArray } from './console.js';
import { FF_PATH, FF_OBJECT, FF_OBJECT_ACTION_SCRIPT_PATH } from './constants.js';
import { exec } from './exec.js';
import { fileExists, getDirectories, getFiles, pathJoin } from './fs.js';

export function isHelp(x) {
	return ["-h", "--help"].includes(x)
}

export function listObjects() {
  logArray(getDirectories(FF_PATH))
}

export function listActions() {
  logArray(getActions())
}

export function getActions() {
  const specificObjectActions = getSpecificObjectActions();
  const commonObjectActionDependencies = getCommonObjectActionDependencies();
  return [
    ...specificObjectActions,
    ...(
      commonObjectActionDependencies
        .filter(x => specificObjectActions.includes(x))
        .map(x => pathJoin(FF_COMMON_FOLDER, x))
        .flatMap(getFiles)
        .filter(x => !specificObjectActions.includes(x))
    )
  ]
}

export async function showScript() {
  if(fileExists(FF_OBJECT_ACTION_SCRIPT_PATH)) {
    await exec(`cat ${FF_OBJECT_ACTION_SCRIPT_PATH}`);
    return;
  }
}

export function getSpecificObjectActions() {
  return getFiles(pathJoin(FF_PATH, FF_OBJECT));
}

const FF_COMMON_FOLDER = pathJoin(FF_PATH, ".common");

export function getCommonObjectActionDependencies() {
  return getDirectories(FF_COMMON_FOLDER);
}
