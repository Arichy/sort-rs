import test from 'ava';

import { rayonQuickSortNumbers, normalQuickSortNumbers } from '../dist/index.js';
import { getRandomFloatArray, getSortedIntArray, isSorted } from '../utils.js';

test('normal quick sort number asc', t => {
  const run = count => {
    const input = getRandomFloatArray(count);
    const result = normalQuickSortNumbers(input);
    t.assert(isSorted(result));
  };
  for (const count of [100_000, 300_000, 500_000, 1_000_000]) {
    run(count);
  }
});

test('normal quick sort number desc', t => {
  const run = count => {
    const input = getRandomFloatArray(count);
    const result = normalQuickSortNumbers(input, false);
    t.assert(isSorted(result, false));
  };
  for (const count of [10, 30, 50, 100, 1000, 3000, 5000, 10000]) {
    run(count);
  }
});

test('normal quick sort asc-sorted large-set numbers', t => {
  const run = count => {
    const input = getSortedIntArray(count);
    const result = normalQuickSortNumbers(input);
    t.assert(isSorted(result));

    const result2 = normalQuickSortNumbers(input, false);
    t.assert(isSorted(result2, false));
  };
  for (const count of [100_000, 300_000, 500_000, 1_000_000]) {
    run(count);
  }
});

test('normal quick sort desc-sorted large-set numbers', t => {
  const run = count => {
    const input = getSortedIntArray(count, false);
    const result = normalQuickSortNumbers(input, false);
    t.assert(isSorted(result, false));

    const result2 = normalQuickSortNumbers(input, true);
    t.assert(isSorted(result2, true));
  };
  for (const count of [100_000, 300_000, 500_000, 1_000_000]) {
    run(count);
  }
});

test('rayon quick sort number asc', t => {
  const run = count => {
    const input = getRandomFloatArray(count);
    const result = rayonQuickSortNumbers(input);
    t.assert(isSorted(result));
  };

  for (const count of [100_000, 300_000, 500_000, 1_000_000]) {
    run(count);
  }
});

test('rayon quick sort number desc', t => {
  const run = count => {
    const input = getRandomFloatArray(count);
    const result = rayonQuickSortNumbers(input, false);
    t.assert(isSorted(result, false));
  };
  for (const count of [10, 30, 50, 100, 1000, 5000, 10000, 100000, 50_000, 1_000_000]) {
    run(count);
  }
});

test('rayon quick asc-sorted large-set numbers', t => {
  const run = count => {
    const input = getSortedIntArray(count);
    const result = rayonQuickSortNumbers(input);
    t.assert(isSorted(result));

    const result2 = rayonQuickSortNumbers(input, false);
    t.assert(isSorted(result2, false));
  };
  for (const count of [100_000, 300_000, 500_000, 1_000_000]) {
    run(count);
  }
});

test('rayon quick desc-sorted large-set numbers', t => {
  const run = count => {
    const input = getSortedIntArray(count, false);
    const result = rayonQuickSortNumbers(input, false);
    t.assert(isSorted(result, false));

    const result2 = rayonQuickSortNumbers(input, true);
    t.assert(isSorted(result2, true));
  };
  for (const count of [100_000, 300_000, 500_000, 1_000_000]) {
    run(count);
  }
});
