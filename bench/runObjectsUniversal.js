const Benchmark = require('benchmark');
const {
  rayonQuickSortObjectsUniversal,
  normalQuickSortObjectsUniversal,
  sortObjectsUniversal,
} = require('../dist/index.js');
const { getRandomFloat, isObjectsSorted, sortObjects, getRandomInt } = require('../utils.js');
const { printResult } = require('./utils.js');

function runSuit(count) {
  const suit = new Benchmark.Suite({ name: `Sort ${count.toLocaleString().red} objects`, async: true });
  const randomObjects = Array.from({ length: count }, (_, i) => ({
    id: i,
    field1: getRandomInt(-1000, 1000),
    field2: getRandomFloat(-1000, 1000),
    field3: getRandomFloat(100, 100000),
  }));

  const priorityList = ['field1', 'field2', 'field3'];
  const orderList = new Array(priorityList.length).fill(0).map(() => Math.random() > 0.5);

  let resolve = () => {};
  let reject = () => {};
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  suit
    .add(
      'js sort',
      () => {
        const sorted = sortObjects(randomObjects, priorityList, orderList);
        if (!isObjectsSorted(sorted, priorityList, orderList)) {
          reject(`js sort failed: ${count} objects`);
        }
      },
      { async: true }
    )
    .add(
      'rust normal quick sort',
      () => {
        const sorted = normalQuickSortObjectsUniversal(randomObjects, priorityList, orderList);
        if (!isObjectsSorted(sorted, priorityList, orderList)) {
          reject(`rust normal quick sort failed: ${count} objects`);
        }
      },
      { async: true }
    )
    .add(
      'rust rayon quick sort',
      () => {
        const sorted = rayonQuickSortObjectsUniversal(randomObjects, priorityList, orderList);
        if (!isObjectsSorted(sorted, priorityList, orderList)) {
          reject(`rust rayon quick sort failed: ${count} objects`);
        }
      },
      { async: true }
    )
    .add('final rust sort universal', () => {
      const sorted = sortObjectsUniversal(randomObjects, priorityList, orderList);
      if (!isObjectsSorted(sorted, priorityList, orderList)) {
        reject(`final rust sort universal failed: ${count} objects`);
      }
    })
    .on('start', () => {
      console.log(`Start ${suit.name}`);
    })
    .on('complete', function () {
      printResult(this, bench => bench.name !== 'final rust sort universal');

      resolve(this);
    })
    .run({ async: true, minSamples: 5 });

  return promise;
}

async function runObjectsUniversal() {
  try {
    const counts = [
      // fastest:js
      // 20,
      100, 150, 200, 300,
      // 500, 1_000,
      // fastest: rayon
      // 1250, 5_000, 10_000, 50_000, 100_000, 500_000, 1_000_000, 2_000_000,
    ];
    for (const count of counts) {
      await runSuit(count);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = runObjectsUniversal;
