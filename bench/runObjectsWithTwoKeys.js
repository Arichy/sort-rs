const Benchmark = require('benchmark');
const {
  normalQuickSortObjectsWithTwoPriorityKeys,
  rayonQuickSortObjectsWithTwoPriorityKeys,
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

  const key0 = 'field0';
  const key1 = 'field1';
  const asc0 = Math.random() > 0.5;
  const asc1 = Math.random() > 0.5;

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
          const aVal0 = a[key0];
          const bVal0 = b[key0];
          if (aVal0 === bVal0) {
            const aVal1 = a[key1];
            const bVal1 = b[key1];
            return asc1 ? aVal1 - bVal1 : bVal1 - aVal1;
          }
          return asc0 ? aVal0 - bVal0 : bVal0 - aVal0;
        });

        if (!isObjectsSorted(sorted, [key0, key1], [asc0, asc1])) {
          reject(`js sort failed: ${count} objects`);
        }
      },
      { async: true }
    )
    .add(
      'rust normal quick sort with two keys',
      () => {
        const sorted = normalQuickSortObjectsWithTwoPriorityKeys(randomObjects, key0, key1, asc0, asc1);
        if (!isObjectsSorted(sorted, [key0, key1], [asc0, asc1])) {
          reject(`rust normal quick sort failed: ${count} objects`);
        }
      },
      { async: true }
    )
    .add(
      'rust rayon quick sort with two keys',
      () => {
        const sorted = rayonQuickSortObjectsWithTwoPriorityKeys(randomObjects, key0, key1, asc0, asc1);
        if (!isObjectsSorted(sorted, [key0, key1], [asc0, asc1])) {
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

async function runObjectsWithTwoKeys() {
  try {
    const counts = [
      // fastest: js
      20, 35,
      //  fastest: normal
      40, 50, 100, 500, 1_000, 1_125, 2_000, 3_000,
      // fastest: rayon
      3_500, 4_000, 5_000, 10_000, 50_000, 100_000, 500_000, 1_000_000, 2_000_000,
    ];
    for (const count of counts) {
      await runSuit(count);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = runObjectsWithTwoKeys;
