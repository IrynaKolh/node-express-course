const { createReadStream } = require('fs')

const stream = createReadStream('../content/big.txt', { encoding: 'utf8', highWaterMark: 200 });

let counter = 0;

stream.on('data', () => {
  counter++;
  console.log(counter)
})
stream.on('end', () => {
  console.log(`The number of chunks received is ${counter}`)
});
stream.on('error', (err) => console.log(err))