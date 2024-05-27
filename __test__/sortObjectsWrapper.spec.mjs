import test from 'ava';

import {
  normalQuickSortObjectsUniversal,
  rayonQuickSortObjectsUniversal,
  sortObjectsUniversal,
} from '../dist/index.js';
import { getRandomFloat, getSortedIntArray, isObjectsSorted } from '../utils.js';

const FIELD_COUNT = 3;
let enableId = false;
const getRandomObjectArray = (objectCount, fieldCount) => {
  const result = [];
  for (let i = 0; i < objectCount; i++) {
    const obj = {};
    if (enableId) obj.id = i;

    for (let j = 0; j < fieldCount; j++) {
      obj[`field${j}`] = getRandomFloat(-1000, 100);
    }
    result.push(obj);
  }
  return result;
};

// sort objects
test('normal quick sort objects', t => {
  const run = count => {
    const input = getRandomObjectArray(count, FIELD_COUNT);

    const priorityOrderList = Object.keys(input[0]);
    const orderList = new Array(FIELD_COUNT + (enableId ? 1 : 0)).fill(0).map(() => Math.random() > 0.5);
    const result = normalQuickSortObjectsUniversal(input, priorityOrderList, orderList);
    t.assert(isObjectsSorted(result, priorityOrderList, orderList));
  };

  for (const count of [10, 30, 50, 100, 1000, 5000, 10000, 100000, 50_000, 1_000_000]) {
    run(count);
  }
});

test('normal quick sort asc-sorted objects', t => {
  const run = count => {
    const sorted = getSortedIntArray(count);
    const input = [];
    for (const i of sorted) {
      input.push({ id: i });
    }

    const priorityOrderList = Object.keys(input[0]);

    const result = normalQuickSortObjectsUniversal(input, priorityOrderList, [true]);
    t.assert(isObjectsSorted(result, priorityOrderList, [true]));

    const result2 = normalQuickSortObjectsUniversal(input, priorityOrderList, [false]);
    t.assert(isObjectsSorted(result2, priorityOrderList, [false]));
  };

  for (const count of [10, 30, 50, 100, 1000, 5000, 10_000, 100_000, 50_000, 1_000_000]) {
    run(count);
  }
});

test('normal quick sort desc-sorted objects', t => {
  const run = count => {
    const sorted = getSortedIntArray(count, false);
    const input = [];
    for (const i of sorted) {
      input.push({ id: i });
    }

    const priorityOrderList = Object.keys(input[0]);

    const result = normalQuickSortObjectsUniversal(input, priorityOrderList, [false]);
    t.assert(isObjectsSorted(result, priorityOrderList, [false]));

    const result2 = normalQuickSortObjectsUniversal(input, priorityOrderList, [true]);
    t.assert(isObjectsSorted(result2, priorityOrderList, [true]));
  };

  for (const count of [10, 30, 50, 100, 1_000, 5_000, 10_000, 50_000, 1_000_000]) {
    run(count);
  }
});

test('rayon quick sort objects', t => {
  const run = count => {
    const input = getRandomObjectArray(count, FIELD_COUNT);

    const priorityOrderList = Object.keys(input[0]);
    const orderList = new Array(FIELD_COUNT + (enableId ? 1 : 0)).fill(0).map(() => Math.random() > 0.5);
    const result = rayonQuickSortObjectsUniversal(input, priorityOrderList, orderList);
    t.assert(isObjectsSorted(result, priorityOrderList, orderList));
  };

  for (const count of [10, 30, 50, 100, 1_000, 5_000, 10_000, 50_000, 1_000_000]) {
    run(count);
  }
});

test('rayon quick sort asc-sorted objects', t => {
  const run = count => {
    const sorted = getSortedIntArray(count);
    const input = [];
    for (const i of sorted) {
      input.push({ id: i });
    }

    const priorityOrderList = Object.keys(input[0]);

    const result = rayonQuickSortObjectsUniversal(input, priorityOrderList, [true]);
    t.assert(isObjectsSorted(result, priorityOrderList, [true]));

    const result2 = rayonQuickSortObjectsUniversal(input, priorityOrderList, [false]);
    t.assert(isObjectsSorted(result2, priorityOrderList, [false]));
  };

  for (const count of [10, 50, 100, 1_000, 5_000, 10_000, 50_000, 1_000_000]) {
    run(count);
  }
});

test('rayon quick sort desc-sorted objects', t => {
  const run = count => {
    const sorted = getSortedIntArray(count, false);
    const input = [];
    for (const i of sorted) {
      input.push({ id: i });
    }

    const priorityOrderList = Object.keys(input[0]);

    const result = rayonQuickSortObjectsUniversal(input, priorityOrderList, [false]);
    t.assert(isObjectsSorted(result, priorityOrderList, [false]));

    const result2 = rayonQuickSortObjectsUniversal(input, priorityOrderList, [true]);
    t.assert(isObjectsSorted(result2, priorityOrderList, [true]));
  };

  for (const count of [10, 50, 100, 1_000, 5_000, 10_000, 50_000, 1_000_000]) {
    run(count);
  }
});
