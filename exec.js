import util from 'util';
import child_process from 'child_process';

async function execSafe(command) {
  const execPromise = util.promisify(child_process.exec);
  try {
      return await execPromise(command).then(cleanResult);
  } catch (err) {
     console.error(err);
  };
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
