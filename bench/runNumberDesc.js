const Benchmark = require('benchmark');
const { rayonSortNumbers, normalSortNumbers, sortNumbers } = require('../dist/index.js');
const { getRandomFloatArray, isSorted } = require('../utils.js');

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
      },
      { maxTime: 0.5 }
    )
    .add('js native sort desc', () => {
      // console.time('js native sort');
      const copy = [...testArray];
      const input = [...copy];
      input.sort((a, b) => b - a);
      // console.timeEnd('js native sort');
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
      },
      { maxTime: 0.5 }
    )
    .add(
      'final sort desc',
      () => {
        const copy = [...testArray];
        const result = sortNumbers(copy, false);
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
      const results = this
        // .filter(bench => bench.name !== 'final sort desc')
        .map(bench => {
          return {
            name: bench.name,
            ops: Math.round(bench.hz),
          };
        })
        .sort((a, b) => b.ops - a.ops);

      const tableResults = this.map(bench => {
        return {
          Name: bench.name,
          'Ops/sec': Math.round(bench.hz).toLocaleString(),
          'Margin of Error': `±${bench.stats.rme.toFixed(2)}%`,
          Samples: bench.stats.sample.length,
        };
      });

      // console.table(results);
      console.log(`Fastest is ${results[0].name.green} with ${results[0].ops.toFixed(2).blue} ops/sec`);
      console.log(`Second fastest is ${results[1].name.yellow} with ${results[1].ops.toFixed(2).blue} ops/sec`);
      const speedDifference = results[0].ops / results[1].ops;
      console.log(
        `${results[0].name.green} is ${speedDifference.toFixed(2).blue} times faster than ${results[1].name.yellow}`
      );
      // console.table(tableResults);
      console.log();
      resolve(this);
    })
    .run({ async: true });

  return promise;
}

async function runDesc() {
  // fastest: js native
  await runSuit(1);
  await runSuit(10);
  await runSuit(20);
  await runSuit(25);

  // fastest: normal sort
  await runSuit(30);
  await runSuit(35);
  await runSuit(40);
  await runSuit(50);
  await runSuit(80);
  await runSuit(100);
  await runSuit(500);
  await runSuit(1_000);
  await runSuit(2_000);
  await runSuit(3_000);
  // fasetst: rayon sort
  await runSuit(4_000);
  await runSuit(5_000);
  // await runSuit(10_000);
  // await runSuit(50_000);
  // await runSuit(100_000);
  // await runSuit(500_000);
  // await runSuit(1_000_000);
  // await runSuit(2_000_000);
  // await runSuit(5_000_000);
  // await runSuit(10_000_000);
}

module.exports = runDesc;
