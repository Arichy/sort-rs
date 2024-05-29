const Benchmark = require('benchmark');
const {
  normalQuickSortNumbers,
  rayonQuickSortNumbers,
  sortNumbers,
  normalQuickSortNumbersCommon,
  rayonQuickSortNumbersCommon,
} = require('../dist/index.js');
const { getRandomFloatArray, isSorted } = require('../utils.js');
const { printResult } = require('./utils.js');

function runSuit(count) {
  const suite = new Benchmark.Suite({ name: `Sort ${count.toLocaleString().red} numbers` });
  const testArray = getRandomFloatArray(count);

  let resolve = () => {};
  let reject = () => {};
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  suite
    .add(
      'normal quick sort',
      () => {
        const copy = [...testArray];
        // const copy = getRandomFloatArray(count);
        const result = normalQuickSortNumbers(copy);
        if (!isSorted(result)) {
          reject(`normal quick sort asc failed: ${count} numbers`);
        }
      },
      { maxTime: 0.5 }
    )
    .add(
      'rayon quick sort',
      () => {
        // console.time('rayon sort');
        const copy = [...testArray];
        // const copy = getRandomFloatArray(count);
        const result = rayonQuickSortNumbers(copy);
        // console.timeEnd('rayon sort');
        if (!isSorted(result)) {
          reject(`rayon quick sort asc failed: ${count} numbers`);
        }
      },
      { maxTime: 0.5 }
    )
    .add('js native sort', () => {
      const copy = [...testArray];
      // const copy = getRandomFloatArray(count);

      const input = [...copy];
      input.sort((a, b) => a - b);
    })
    .add(
      'js typed array sort',
      () => {
        // console.time('js sort');
        const copy = [...testArray];
        // const copy = getRandomFloatArray(count);

        const input = new Float64Array(copy);
        input.sort();
        const result = Array.from(input);
        // console.timeEnd('js sort');
      },
      { maxTime: 0.5 }
    )
    .add(
      'common normal quick sort',
      () => {
        const copy = [...testArray];
        // const copy = getRandomFloatArray(count);

        const result = normalQuickSortNumbersCommon(copy);
        if (!isSorted(result)) {
          reject(`common normal quick sort asc failed: ${count} numbers`);
        }
      },
      { maxTime: 0.5 }
    )
    .add(
      'common rayon quick sort',
      () => {
        const copy = [...testArray];
        // const copy = getRandomFloatArray(count);

        const result = rayonQuickSortNumbersCommon(copy);
        if (!isSorted(result)) {
          reject(`common rayon quick sort asc failed: ${count} numbers`);
        }
      },
      { maxTime: 0.5 }
    )
    .add(
      'final sort',
      () => {
        const copy = [...testArray];
        // const copy = getRandomFloatArray(count);

        const result = sortNumbers(copy);
        if (!isSorted(result)) {
          reject(`final sort asc failed: ${count} numbers`);
        }
      },
      { maxTime: 0.5 }
    )
    .on('start', () => {
      console.log(`Start ${suite.name}`);
    })
    .on('cycle', event => {
      // console.log(String(event.target));
    })
    .on('complete', function () {
      printResult(this, bench => bench.name !== 'final sort');

      resolve(this);
    })
    .run({ async: true });

  return promise;
}

async function runNumbers() {
  const counts = [20, 50, 100, 500, 1_000, 4_900, 10_000, 50_000, 100_000, 500_000, 1_000_000, 2_000_000];

  for (const count of counts) {
    await runSuit(count);
  }
}

module.exports = runNumbers;
