const printResult = (benches, resultFilter = () => true) => {
  const tableResults = benches.map(bench => {
    return {
      Name: bench.name,
      'Ops/sec': bench.hz.toLocaleString(),
      'Mean time': `${(bench.stats.mean * 1000).toFixed(3)} ms`,
      'Margin of Error': `±${bench.stats.rme.toFixed(2)}%`,
      Samples: bench.stats.sample.length,
    };
  });
  console.table(tableResults);

  const results = benches
    .filter(resultFilter)
    .map(bench => {
      return {
        name: bench.name,
        ops: bench.hz,
        mean: bench.stats.mean * 1000,
      };
    })
    .sort((a, b) => a.mean - b.mean);
  const speedDifference = results[1].mean / results[0].mean;
  console.log(`Fastest is ${results[0].name.green} with ${results[0].ops.toFixed(2).blue} ops/sec`);
  console.log(`Second fastest is ${results[1].name.yellow} with ${results[1].ops.toFixed(2).blue} ops/sec`);
  console.log(
    `${results[0].name.green} is ${speedDifference.toFixed(2).blue} times faster than ${results[1].name.yellow}`
  );
  console.log();
};

module.exports = {
  printResult,
};
