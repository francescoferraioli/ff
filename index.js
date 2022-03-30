#!/usr/bin/env node

const util = require('util');
const _exec = util.promisify(require('child_process').exec);

const FF_SCRIPT_HOME = process.env.FF_SCRIPT_HOME

if(!FF_SCRIPT_HOME) {
  console.error("You need to set the FF_SCRIPT_HOME environment variable.")
  return 1;
}

async function execSafe(command) {
  try {
      return await _exec(command);
  } catch (err) {
     console.error(err);
  };
}

async function exec(command, silent) {
  const result = await execSafe(command);

  if(!result) return;

  if(result.stdout) {
    if(!silent) {
      console.log(result.stdout)
    }
    return result.stdout;
  }

  if(result.stderr) {
    if(!silent) {
      console.error(result.stderr)
    }
  }
};

async function run() {
  const ffObject = process.argv[2]
  const ffAction = process.argv[3]
  exec(`sh ${FF_SCRIPT_HOME}/${ffObject}/${ffAction}`)
}

run()
