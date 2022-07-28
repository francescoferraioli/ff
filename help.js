import { logArray } from './console.js';
import { FF_PATH, FF_OBJECT, FF_OBJECT_ACTION_SCRIPT_PATH, FF_ACTION } from './constants.js';
import { exec, execPipe } from './exec.js';
import { fileExists, getDirectories, getFiles, pathJoin } from './fs.js';

const README_FILENAME = 'README.md'

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
  return [
    ...specificObjectActions,
    ...(
      getCommonObjectActions(specificObjectActions)
        .flatMap(([, actions]) => actions)
        .filter(x => !specificObjectActions.includes(x))
    )
  ]
}

export function getCommonObjectActions(specificObjectActions = getSpecificObjectActions()) {
  return getCommonObjectActionDependencies()
    .filter(x => specificObjectActions.includes(x))
    .map(x => [x, getFiles(pathJoin(FF_COMMON_FOLDER, x))])
}

export async function showScript() {
  if(fileExists(FF_OBJECT_ACTION_SCRIPT_PATH)) {
    await exec(`cat ${FF_OBJECT_ACTION_SCRIPT_PATH}`);
    return 0;
  }

  const commonActionScript = getCommonActionScriptPath();

  if(commonActionScript) {
    await execPipe(
      [
        `cat ${commonActionScript}`,
        `sed "s/\$1/${FF_OBJECT}/g"`
      ]
    );
    return 0;
  }

  console.error("Command not found!")
  return 1;
}

export function getSpecificObjectActions() {
  return getFiles(pathJoin(FF_PATH, FF_OBJECT)).filter(x => x !== README_FILENAME);
}

const FF_COMMON_FOLDER = pathJoin(FF_PATH, ".common");

export function getCommonObjectActionDependencies() {
  return getDirectories(FF_COMMON_FOLDER);
}

export function getCommonActionScriptPath() {
  const dependencyAction = getCommonObjectActions()
    .find(([,actions]) => actions.includes(FF_ACTION))
    ?.[0]

  return dependencyAction && pathJoin(FF_COMMON_FOLDER, dependencyAction, FF_ACTION)
}
