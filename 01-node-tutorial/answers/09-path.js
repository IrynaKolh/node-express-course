const path = require('path');

console.log(path.sep)

const parts = ['/content', 'subfolder', 'test.txt'];
const joinedPath = path.join(...parts);
console.log('Joined Path:', joinedPath);

const base = path.basename(joinedPath);
console.log(base);

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log('Absolute Path:', absolute)