const os = require('os');

const myPC = os.cpus();
console.log("Information about my computer:");
console.log(myPC);

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
  homedir: os.homedir(),
  platform: os.platform(),
  host: os.hostname(),
};
console.log("Information about my operation system:");
console.log(currentOS);