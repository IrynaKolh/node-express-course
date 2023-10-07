const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

for (let i = 0; i < 10; i++) {
  emitter.emit("greet", "Iryna");  
}
