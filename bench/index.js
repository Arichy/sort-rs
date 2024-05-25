const runAsc = require('./runAsc');
const runDesc = require('./runDesc');
const colors = require('colors');

async function main() {
  await runAsc();
  await runDesc();
}

main();
