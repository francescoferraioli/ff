import { FF_OBJECT, FF_ACTION, FF_ARGS, FF_OBJECT_ACTION_SCRIPT_PATH } from './constants.js';
import { exec } from './exec.js';
import { isHelp, listObjects, listActions, showScript } from './help.js';

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

  await exec(`sh ${FF_OBJECT_ACTION_SCRIPT_PATH}`)
}
