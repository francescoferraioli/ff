#!/usr/bin/env node

import { exec } from './exec.js';

const FF_SCRIPT_HOME = process.env.FF_SCRIPT_HOME

if(!FF_SCRIPT_HOME) {
  console.error("You need to set the FF_SCRIPT_HOME environment variable.")
  process.exit(1);
}

async function run() {
  const ffObject = process.argv[2]
  const ffAction = process.argv[3]
  exec(`sh ${FF_SCRIPT_HOME}/${ffObject}/${ffAction}`)
}

run()
