const Benchmark = require('benchmark');
const {
  normalQuickSortObjectsWithOnePriorityKey,
  rayonQuickSortObjectsWithOnePriorityKey,
} = require('../dist/index.js');
const { getRandomFloat, isObjectsSorted, getRandomInt, sortObjectsWithOneKey } = require('../utils.js');
const { printResult } = require('./utils.js');

function runSuit(count) {
  const suit = new Benchmark.Suite({ name: `Sort ${count.toLocaleString().red} objects with one key`, async: true });
  const randomObjects = Array.from({ length: count }, (_, i) => ({
    id: i,
    field0: getRandomInt(-1000, 1000),
    field1: getRandomFloat(-1000, 1000),
  }));

  const key = 'field0';
  const asc = Math.random() > 0.5;

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
        const sorted = [...randomObjects];
        sorted.sort((a, b) => {
          const aVal = a[key];
          const bVal = b[key];
          return asc ? aVal - bVal : bVal - aVal;
        });
        if (!isObjectsSorted(sorted, [key], [asc])) {
          reject(`js sort failed: ${count} objects`);
        }
      },
      { async: true }
    )
    .add(
      'rust normal quick sort with one key',
      () => {
        const sorted = normalQuickSortObjectsWithOnePriorityKey(randomObjects, key, asc);
        if (!isObjectsSorted(sorted, [key], [asc])) {
          reject(`rust normal quick sort failed: ${count} objects`);
        }
      },
      { async: true }
    )
    .add(
      'rust rayon quick sort with one key',
      () => {
        const sorted = rayonQuickSortObjectsWithOnePriorityKey(randomObjects, key, asc);
        if (!isObjectsSorted(sorted, [key], [asc])) {
          reject(`rust rayon quick sort failed: ${count} objects`);
        }
      },
      { async: true }
    )
    // .add('final rust sort with one key', () => {
    //   const sorted = sortObjectsUniversal(randomObjects, key, asc);
    //   if (!isObjectsSorted(sorted, key, asc)) {
    //     reject(`final rust sort universal failed: ${count} objects`);
    //   }
    // });
    .on('start', function () {
      console.log(`Start ${this.name}`);
    })
    .on('complete', function () {
      printResult(this);

      resolve();
    })
    .run({ async: true });

  return promise;
}

async function runObjectsWithOneKey() {
  try {
    const counts = [
      // fastest: js
      20,
      //  fastest: normal
      35, 100, 500, 1_000, 3_000,
      // fastest: rayon
      5_000, 10_000, 50_000, 100_000, 500_000, 1_000_000, 2_000_000,
    ];
    for (const count of counts) {
      await runSuit(count);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = runObjectsWithOneKey;
