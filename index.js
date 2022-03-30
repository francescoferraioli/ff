#!/usr/bin/env node

import { FF_PATH } from './constants.js';
import { exec } from './exec.js';
import { isHelp, listObjects } from './help.js';

async function run() {
  const FF_OBJECT = process.argv[2]

  if(isHelp(FF_OBJECT)) {
    await listObjects()
    process.exit(0)
  }

  const FF_ACTION = process.argv[3]

  await exec(`sh ${FF_PATH}/${FF_OBJECT}/${FF_ACTION}`)
}

run()
