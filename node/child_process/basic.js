var child_process = require('child_process');

child_process.execFile('node', ['--version'], function(error, stdout, stderr){
  if(error){
    throw error;
  }
  console.log(stdout);
});

child_process.execFile('C:/soft/nodejs/node', ['--version'], function(error, stdout, stderr){
  if(error){
    throw error;
  }
  console.log(stdout);
});