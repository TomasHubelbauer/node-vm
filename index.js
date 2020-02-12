const vm = require('vm');
const fs = require('fs-extra');

console.log('main:', process.argv);

const context = vm.createContext({
  require,
  module: {},
  setTimeout,
  process: { argv: ['node', 'dep'] },
  console: { log: (message, ...optionalParams) => console.log('VM:', message, ...optionalParams) },
});

// Leaks out-of-context stuff into the script
vm.runInContext(`require('./dep.js');`, context);

// Requires all the Node APIs to be contextified
// I want something more akin to `cp.spawn` with `cwd`, pretending to be a new,
// clean Node process
vm.runInContext(fs.readFileSync('dep.js', { encoding: 'utf-8' }), context);
