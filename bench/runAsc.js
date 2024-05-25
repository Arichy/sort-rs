const Benchmark = require('benchmark');
const { rayonSortNumbers, normalSortNumbers, sortNumbers } = require('../dist/index.js');
const { getRandomFloatArray, isSorted } = require('../utils.js');

function runAscSuit(count) {
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
      'normal sort asc',
      () => {
        const copy = [...testArray];
        // const copy = getRandomFloatArray(count);
        const result = normalSortNumbers(copy);
      },
      { maxTime: 0.5 }
    )
    .add(
      'rayon sort asc',
      () => {
        // console.time('rayon sort');
        const copy = [...testArray];
        // const copy = getRandomFloatArray(count);
        const result = rayonSortNumbers(copy);
        // console.timeEnd('rayon sort');
      },
      { maxTime: 0.5 }
    )
    .add('js native sort asc', () => {
      const copy = [...testArray];
      // const copy = getRandomFloatArray(count);

      const input = [...copy];
      input.sort((a, b) => a - b);
    })
    .add(
      'js typed array sort asc',
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
      'final sort asc',
      () => {
        const copy = [...testArray];
        // const copy = getRandomFloatArray(count);

        const result = sortNumbers(copy);
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
        // .filter(bench => bench.name !== 'final sort asc')
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

async function runAsc() {
  // await runAscSuit(1);
  // await runAscSuit(5);

  // fastest: js native
  // await runAscSuit(10);
  await runAscSuit(20);
  // await runAscSuit(22);
  // await runAscSuit(24);

  // fastest: js typed array
  // await runAscSuit(26);
  // await runAscSuit(28);
  // await runAscSuit(30);
  // await runAscSuit(40);
  await runAscSuit(50);
  await runAscSuit(60);
  // fasetst: normal sort
  await runAscSuit(70);

  await runAscSuit(100);
  await runAscSuit(500);
  await runAscSuit(1_000);
  await runAscSuit(2_000);
  await runAscSuit(3_000);
  await runAscSuit(4_000);
  await runAscSuit(4_300);
  await runAscSuit(4_600);

  // // fasetst: rayon sort
  await runAscSuit(4_900);
  await runAscSuit(5_000);
  await runAscSuit(10_000);
  // await runAscSuit(50_000);
  // await runAscSuit(100_000);
  // await runAscSuit(500_000);
  // await runAscSuit(1_000_000);
  // await runAscSuit(2_000_000);
  // await runAscSuit(5_000_000);
  // await runAscSuit(10_000_000);
}

module.exports = runAsc;
