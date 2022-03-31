import { FF_PATH, FF_OBJECT, FF_ACTION } from './constants.js';
import { exec } from './exec.js';
import { isHelp, listObjects, listActions } from './help.js';

export async function ff() {
  if(isHelp(FF_OBJECT)) {
    listObjects()
    process.exit(0)
  }

  if(isHelp(FF_ACTION)) {
    listActions()
    process.exit(0)
  }

  await exec(`sh ${FF_PATH}/${FF_OBJECT}/${FF_ACTION}`)
}
