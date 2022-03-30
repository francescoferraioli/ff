export const FF_PATH = process.env.FF_SCRIPT_HOME

if(!FF_PATH) {
  console.error("You need to set the FF_SCRIPT_HOME environment variable.")
  process.exit(1);
}

export const FF_OBJECT = process.argv[2]

export const FF_ACTION = process.argv[3]

