import util from 'util';
import child_process from 'child_process';

async function execSafe(command) {
  try {
      return await util.promisify(child_process.exec)(command);
  } catch (err) {
     console.error(err);
  };
}

export async function exec(command, silent) {
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
