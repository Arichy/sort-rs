const Benchmark = require('benchmark');
const { sortNumbers, sortObjects } = require('../dist/index.js');
const {
  getRandomFloatArray,
  isSorted,
  sortObjects: jsSortObjects,
  isObjectsSorted,
  getRandomFloat,
  getRandomInt,
} = require('../utils.js');
const { printResult } = require('./utils.js');

function runNumbersSuit(count) {
  const suite = new Benchmark.Suite({ name: `Sort ${count.toLocaleString().red} numbers` });
  const testArray = getRandomFloatArray(count);

  let resolve = () => {};
  let reject = () => {};
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  suite
    .add('js native sort', () => {
      const copy = [...testArray];

      const input = [...copy];
      input.sort((a, b) => a - b);
      if (!isSorted(input)) {
        reject(`js native sort asc failed: ${count} numbers`);
      }
    })
    .add(
      'js typed array sort',
      () => {
        const copy = [...testArray];

        const input = new Float64Array(copy);
        input.sort();
        const result = Array.from(input);
        if (!isSorted(result)) {
          reject(`js typed array sort asc failed: ${count} numbers`);
        }
      },
      { maxTime: 0.5 }
    )
    .add(
      'rust sort',
      () => {
        const copy = [...testArray];

        const result = sortNumbers(copy);
        if (!isSorted(result)) {
          reject(`rust sort asc failed: ${count} numbers`);
        }
      },
      { maxTime: 0.5 }
    )
    .on('start', () => {
      console.log(`Start ${suite.name}`);
    })
    .on('complete', function () {
      printResult(this);

      resolve(this);
    })
    .run({ async: true });

  return promise;
}
async function runNumbers() {
  const counts = [20, 50, 100, 500, 1_000, 4_900, 10_000, 50_000, 100_000, 500_000, 1_000_000, 2_000_000, 10_000_000];

  for (const count of counts) {
    await runNumbersSuit(count);
  }
}

const getRandomObjectArray = (count, fieldCount) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const obj = {};

    for (let j = 0; j < fieldCount; j++) {
      obj[`field${j}`] = j === 0 ? getRandomInt(-1000, 100) : getRandomFloat(-1000, 100);
    }
    result.push(obj);
  }
  return result;
};
function runObjectsSuit(count, fieldCount) {
  const suite = new Benchmark.Suite({ name: `Sort ${count.toLocaleString().red} objects with ${fieldCount} fields` });
  const randomObjects = getRandomObjectArray(count, fieldCount);
  const priorityList = Array.from({ length: fieldCount }, (_, i) => `field${i}`);
  const orderList = new Array(fieldCount).fill(0).map(() => Math.random() > 0.5);

  let resolve = () => {};
  let reject = () => {};
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  suite
    .add(
      'js sort',
      () => {
        const sorted = jsSortObjects(randomObjects, priorityList, orderList);
        if (!isObjectsSorted(sorted, priorityList, orderList)) {
          reject(`js sort failed: ${count} objects, ${fieldCount} fields`);
        }
      },
      { async: true }
    )
    .add(
      'rust sort',
      () => {
        const sorted = sortObjects(randomObjects, priorityList, orderList);
        if (!isObjectsSorted(sorted, priorityList, orderList)) {
          reject(`rust normal quick sort failed: ${count} objects, ${fieldCount} fields`);
        }
      },
      { async: true }
    )
    .on('start', () => {
      console.log(`Start ${suite.name}`);
    })
    .on('complete', function () {
      printResult(this);

      resolve(this);
    })
    .run({ async: true });

  return promise;
}

async function runObjects() {
  const counts = [10, 50, 100, 500, 1_000, 5_000, 10_000, 50_000, 10_000, 1_000_000, 5_000_000];
  const fieldCounts = [1, 2, 3];

  for (const count of counts) {
    for (const fieldCount of fieldCounts) {
      await runObjectsSuit(count, fieldCount);
    }
  }
}

module.exports = {
  runNumbers,
  runObjects,
};
