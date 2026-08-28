import { FF_OBJECT, FF_ACTION, FF_ARGS, FF_OBJECT_ACTION_SCRIPT_PATH } from './constants.js';
import { spawn } from './spawn.js';
import { fileExists } from './fs.js';
import { isHelp, listObjects, listActions, showScript, getCommonActionScriptPath, commandNotFound } from './help.js';

async function ffSpawn(script, args) {
  return spawn('bash', [script, ...args], { stdio: 'inherit' });
}

export async function ff() {
  if(isHelp(FF_OBJECT)) {
    await listObjects()
    process.exit(0)
  }

  if(isHelp(FF_ACTION)) {
    await listActions()
    process.exit(0)
  }

  if(isHelp(FF_ARGS[0])) {
    const result = await showScript()
    process.exit(result)
  }

  if(fileExists(FF_OBJECT_ACTION_SCRIPT_PATH)) {
    process.exit(await ffSpawn(FF_OBJECT_ACTION_SCRIPT_PATH, FF_ARGS))
  }

  const FF_COMMON_ACTION_SCRIPT_PATH = getCommonActionScriptPath()
  if(FF_COMMON_ACTION_SCRIPT_PATH) {
    process.exit(await ffSpawn(FF_COMMON_ACTION_SCRIPT_PATH, [FF_OBJECT, ...FF_ARGS]))
  }

  commandNotFound()
  return process.exit(1);
}
