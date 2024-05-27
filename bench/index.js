const runAsc = require('./runNumberAsc');
const runDesc = require('./runNumberDesc');
const colors = require('colors');
const runObjects = require('./runObject');

async function main() {
  // await runAsc();
  // await runDesc();
  await runObjects();
}

main();
