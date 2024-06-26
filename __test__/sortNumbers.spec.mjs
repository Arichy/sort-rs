import test from 'ava';

import { sortNumbers } from '../dist/index.js';
import { getRandomFloatArray, getSortedIntArray, isSorted } from '../utils.js';

test('fnal sort number, asc', t => {
  const run = count => {
    const input = getRandomFloatArray(count);
    const result = sortNumbers(input);
    t.assert(isSorted(result));
  };

  for (const count of [10, 30, 50, 100, 1000, 5000, 10000, 100000, 50_000, 1_000_000]) {
    run(count);
  }
});

test('final sort number, desc', t => {
  const run = count => {
    const input = getRandomFloatArray(count);
    const result = sortNumbers(input, false);
    t.assert(isSorted(result, false));
  };

  for (const count of [10, 30, 50, 100, 1000, 5000, 10000, 100000, 50_000, 1_000_000]) {
    run(count);
  }
});

test('final sort asc-sorted large-set numbers', t => {
  const run = count => {
    const input = getSortedIntArray(count);
    const result = sortNumbers(input);
    t.assert(isSorted(result));

    const result2 = sortNumbers(input, false);
    t.assert(isSorted(result2, false));
  };

  for (const count of [100_000, 300_000, 500_000, 1_000_000]) {
    run(count);
  }
});

test('final sort desc-sorted large-set numbers', t => {
  const run = count => {
    const input = getSortedIntArray(count, false);
    const result = sortNumbers(input, false);
    t.assert(isSorted(result, false));

    const result2 = sortNumbers(input, true);
    t.assert(isSorted(result2, true));
  };

  for (const count of [100_000, 300_000, 500_000, 1_000_000]) {
    run(count);
  }
});
