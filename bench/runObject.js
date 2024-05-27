const Benchmark = require('benchmark');
const {
  rayonQuickSortObjectsUniversal,
  normalQuickSortObjectsUniversal,
  normalMergeSortObjectsUniversal,
  rayonMergeSortObjectsUniversal,
} = require('../dist/index.js');
const { getRandomFloat, isObjectsSorted, sortObjects, getRandomInt } = require('../utils.js');

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
          reject(`js sort failed ${count} objects`);
        }
      },
      { async: true }
    )
    .add(
      'rust normal quick sort',
      () => {
        const sorted = normalQuickSortObjectsUniversal(randomObjects, priorityList, orderList);
        if (!isObjectsSorted(sorted, priorityList, orderList)) {
          reject(`rust normal quick sort failed ${count} objects`);
        }
      },
      { async: true }
    )
    .add(
      'rust rayon quick sort',
      () => {
        const sorted = rayonQuickSortObjectsUniversal(randomObjects, priorityList, orderList);
        if (!isObjectsSorted(sorted, priorityList, orderList)) {
          reject(`rust rayon quick sort failed ${count} objects`);
        }
      },
      { async: true }
    )
    // .add(
    //   'rust normal merge sort',
    //   () => {
    //     const sorted = normalMergeSortObjectsUniversal(randomObjects, priorityList, orderList);
    //     if (!isObjectsSorted(sorted, priorityList, orderList)) {
    //       reject(`rust normal merge sort failed ${count} objects`);
    //     }
    //   },
    //   { async: true }
    // )
    // .add(
    //   'rust rayon merge sort',
    //   () => {
    //     const sorted = rayonMergeSortObjectsUniversal(randomObjects, priorityList, orderList);
    //     if (!isObjectsSorted(sorted, priorityList, orderList)) {
    //       reject(`rust rayon merge sort failed ${count} objects`);
    //     }
    //   },
    //   { async: true }
    // )
    // .on('start', () => {
    //   console.log(`Start ${suit.name}`);
    // })
    .on('complete', function () {
      // console.log(this);
      const results = this
        // .filter(bench => bench.name !== 'final sort desc')
        .map(bench => {
          return {
            name: bench.name,
            ops: bench.hz,
            mean: bench.stats.mean * 1000,
          };
        })
        .sort((a, b) => a.mean - b.mean);

      const tableResults = this.map(bench => {
        return {
          Name: bench.name,
          'Ops/sec': bench.hz.toLocaleString(),
          'Mean time': `${(bench.stats.mean * 1000).toFixed(3)} ms`,
          'Margin of Error': `±${bench.stats.rme.toFixed(2)}%`,
          Samples: bench.stats.sample.length,
        };
      });

      console.table(tableResults);
      console.log(`Fastest is ${results[0].name.green} with ${results[0].ops.toFixed(2).blue} ops/sec`);
      console.log(`Second fastest is ${results[1].name.yellow} with ${results[1].ops.toFixed(2).blue} ops/sec`);
      // const speedDifference = results[0].ops / results[1].ops;
      const speedDifference = results[1].mean / results[0].mean;
      console.log(
        `${results[0].name.green} is ${speedDifference.toFixed(2).blue} times faster than ${results[1].name.yellow}`
      );
      // console.table(tableResults);
      console.log();
      resolve(this);
    })
    .run({ async: true, minSamples: 5 });

  return promise;
}

async function runObjects() {
  try {
    // fastest: js native sort
    // await runSuit(20);
    // await runSuit(40);
    // await runSuit(60);
    // await runSuit(80);
    // await runSuit(90);

    // fastest: rust normal quick sort
    // await runSuit(100);
    // await runSuit(150);
    // await runSuit(200);
    // await runSuit(300);
    // await runSuit(400);
    // await runSuit(500);
    // await runSuit(600);
    // await runSuit(700);
    // await runSuit(800);
    // await runSuit(900);

    await runSuit(1_000);
    await runSuit(1_125);
    // fastest: rust rayon quick sort
    await runSuit(1_250);
    // await runSuit(1_500);
    // await runSuit(2_000);
    // await runSuit(3_000);
    // await runSuit(4_000);
    // await runSuit(5_000);
    // await runSuit(6_000);
    // await runSuit(7_000);
    // await runSuit(10_000);
    // await runSuit(100_000);
    // await runSuit(500_000);
    // await runSuit(1_000_000);
    // await runSuit(2_000_000);
    // await runSuit(3_000_000);
  } catch (err) {
    console.error(err);
  }
}

module.exports = runObjects;
