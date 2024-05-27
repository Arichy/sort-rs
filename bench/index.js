const runAsc = require('./runNumberAsc');
const runDesc = require('./runNumberDesc');
const colors = require('colors');
const runObjectsUniversal = require('./runObjectsUniversal');
const runObjectsWithOneKey = require('./runObjectsWithOneKey');
const runObjectsWithTwoKeys = require('./runObjectsWithTwoKeys');
const { runAsc: finalRunAsc, runDesc: finalRunDesc, runObjects: finalRunObjects } = require('./final');

async function single() {
  // await runAsc();
  // await runDesc();
  // await runObjectsUniversal();
  // await runObjectsWithOneKey();
  // await runObjectsWithTwoKeys();
}

async function main() {
  await finalRunObjects();
}

// single();
main();
