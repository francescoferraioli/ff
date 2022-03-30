import util from 'util';
import child_process from 'child_process';

const execPromise = util.promisify(child_process.exec);

async function execSafe(command) {
  return execPromise(command)
    .then(cleanResult)
    .catch(console.error)
}

function cleanResult({stdout, stderr}) {
  return {
    stdout: cleanOutput(stdout),
    stderr: cleanOutput(stderr),
  }
}

function cleanOutput(x) {
  return x.trim();
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
