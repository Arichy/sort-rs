const runNumbers = require('./runNumbers');
const colors = require('colors');
const runObjectsUniversal = require('./runObjectsUniversal');
const runObjectsWithOneKey = require('./runObjectsWithOneKey');
const runObjectsWithTwoKeys = require('./runObjectsWithTwoKeys');
const { runNumbers: finalRunNumbers, runObjects: finalRunObjects } = require('./final');

async function single() {
  // await runAsc();
  // await runObjectsUniversal();
  // await runObjectsWithOneKey();
  // await runObjectsWithTwoKeys();
}

async function main() {
  await finalRunNumbers();
  await finalRunObjects();
}

// single();
main();
