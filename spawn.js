import util from 'util';
import child_process from 'child_process';

const spawnPromise = util.promisify(child_process.spawn);

export function spawn(command, args, options) {
  return spawnPromise(command, args, options)
}
