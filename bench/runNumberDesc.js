const Benchmark = require('benchmark');
const { rayonSortNumbers, normalSortNumbers, sortNumbers } = require('../dist/index.js');
const { getRandomFloatArray, isSorted } = require('../utils.js');
const { printResult } = require('./utils.js');

function runSuit(count) {
  const suite = new Benchmark.Suite({ name: `Sort ${count.toLocaleString().red} numbers dessc` });
  const testArray = getRandomFloatArray(count);

  let resolve = () => {};
  let reject = () => {};
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  suite
    .add(
      'normal sort desc',
      () => {
        const copy = [...testArray];
        const result = normalSortNumbers(copy, false);
        if (!isSorted(result, false)) {
          reject(`normal sort desc failed: ${count} numbers`);
        }
      },
      { maxTime: 0.5 }
    )
    .add(
      'rayon sort desc',
      () => {
        // console.time('rayon sort');
        const copy = [...testArray];
        const result = rayonSortNumbers(copy, false);
        // console.timeEnd('rayon sort');
        if (!isSorted(result, false)) {
          reject(`rayon sort desc failed: ${count} numbers`);
        }
      },
      { maxTime: 0.5 }
    )
    .add('js native sort desc', () => {
      // console.time('js native sort');
      const copy = [...testArray];
      const input = [...copy];
      input.sort((a, b) => b - a);
      // console.timeEnd('js native sort');

      if (!isSorted(input, false)) {
        reject(`js native sort desc failed: ${count} numbers`);
      }
    })
    .add(
      'js typed array sort desc',
      () => {
        // console.time('js sort');
        const copy = [...testArray];
        const input = new Float64Array(copy);
        input.sort((a, b) => b - a);
        const result = Array.from(input);
        // console.timeEnd('js sort');

        if (!isSorted(result, false)) {
          reject(`js typed array sort desc failed: ${count} numbers`);
        }
      },
      { maxTime: 0.5 }
    )
    .add(
      'final sort desc',
      () => {
        const copy = [...testArray];
        const result = sortNumbers(copy, false);

        if (!isSorted(result, false)) {
          reject(`final sort desc failed: ${count} numbers`);
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
      printResult(this, bench => bench.name !== 'final sort desc');

      resolve(this);
    })
    .run({ async: true });

  return promise;
}

async function runDesc() {
  const counts = [25, 50, 100, 500, 1_000, 4_000, 10_000, 50_000, 100_000, 500_000, 1_000_000, 2_000_000];
  for (const count of counts) {
    await runSuit(count);
  }
}

module.exports = runDesc;
