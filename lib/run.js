const { exec } = require('child_process');
const path = require('path');

module.exports = async function (command, workingDir) {
  return new Promise(function (resolve, reject) {
    const resolvedWorkingDir = path.resolve(workingDir);

    console.log(`>> ${resolvedWorkingDir} $ ${command}`);
    
    exec(command, { cwd: resolvedWorkingDir }, function (err, stdout) {
      if (err) {
        return reject(err);
      }

      return resolve(stdout);
    });
  });
};