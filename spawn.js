import { spawn as spawnProcess } from 'child_process';

export function spawn(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawnProcess(command, args, options);
    child.on('error', reject);
    child.on('close', (code, signal) => {
      if (signal) {
        resolve(1);
        return;
      }
      resolve(code ?? 1);
    });
  });
}
