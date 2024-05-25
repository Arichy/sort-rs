import test from 'ava';

import { rayonSortNumbers, sortNumbers } from '../dist/index.js';
import { getRandomFloatArray, isSorted } from '../test-utils.js';

test('rayon sort number asc', t => {
  const run = count => {
    const input = getRandomFloatArray(count);
    const result = rayonSortNumbers(input);
    t.assert(isSorted(result));
  };

  for (let i = 0; i < 10; i++) {
    run();
  }
});

test('rayon sort number desc', t => {
  const run = count => {
    const input = getRandomFloatArray(count);
    const result = rayonSortNumbers(input, false);
    t.assert(isSorted(result, false));
  };
  for (const count of [10, 30, 50, 100, 1000, 3000, 5000, 10000]) {
    run(count);
  }
});

test('fnal sort number, asc', t => {
  const run = count => {
    const input = getRandomFloatArray(count);
    const result = sortNumbers(input);
    t.assert(isSorted(result));
  };

  for (const count of [10, 30, 50, 100, 1000, 3000, 5000, 10000]) {
    run(count);
  }
});

test('fnal sort number, desc', t => {
  const run = count => {
    const input = getRandomFloatArray(count);
    const result = sortNumbers(input, false);
    t.assert(isSorted(result, false));
  };

  for (const count of [10, 30, 50, 100, 1000, 3000, 5000, 10000]) {
    run(count);
  }
});
