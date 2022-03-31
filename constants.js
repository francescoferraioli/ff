export const FF_PATH = process.env.FF_SCRIPT_HOME

if(!FF_PATH) {
  console.error("You need to set the FF_SCRIPT_HOME environment variable.")
  process.exit(1);
}

export const [, , FF_OBJECT, FF_ACTION, ...FF_ARGS] = process.argv

export const FF_OBJECT_ACTION_SCRIPT_PATH = `${FF_PATH}/${FF_OBJECT}/${FF_ACTION}`
