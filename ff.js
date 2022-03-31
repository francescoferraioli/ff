import { FF_OBJECT, FF_ACTION, FF_ARGS, FF_OBJECT_ACTION_SCRIPT_PATH } from './constants.js';
import { exec } from './exec.js';
import { fileExists } from './fs.js';
import { isHelp, listObjects, listActions, showScript, getCommonActionScriptPath } from './help.js';

export async function ff() {
  if(isHelp(FF_OBJECT)) {
    listObjects()
    process.exit(0)
  }

  if(isHelp(FF_ACTION)) {
    listActions()
    process.exit(0)
  }

  if(isHelp(FF_ARGS[0])) {
    const result = await showScript()
    process.exit(result)
  }

  if(fileExists(FF_OBJECT_ACTION_SCRIPT_PATH)) {
    await exec(`sh ${FF_OBJECT_ACTION_SCRIPT_PATH}`)
    process.exit(0)
  }

  const FF_COMMON_ACTION_SCRIPT_PATH = getCommonActionScriptPath()
  if(FF_COMMON_ACTION_SCRIPT_PATH) {
    await exec(`sh ${FF_COMMON_ACTION_SCRIPT_PATH} ${FF_OBJECT}`)
    process.exit(0)
  }

  console.error("Command not found!")
  return process.exit(1);
}
