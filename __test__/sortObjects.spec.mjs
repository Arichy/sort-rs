import test from 'ava';

import { sortObjectsUniversal } from '../dist/index.js';
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

test('final sort objects universal', t => {
  const run = count => {
    const input = getRandomObjectArray(count, FIELD_COUNT);

    const priorityOrderList = Object.keys(input[0]);
    const orderList = new Array(FIELD_COUNT + (enableId ? 1 : 0)).fill(0).map(() => Math.random() > 0.5);
    const result = sortObjectsUniversal(input, priorityOrderList, orderList);
    t.assert(isObjectsSorted(result, priorityOrderList, orderList));
  };

  for (const count of [10, 50, 100, 1_000, 5_000, 10_000, 50_000, 1_000_000]) {
    run(count);
  }
});

test('final sort asc-sorted objects', t => {
  const run = count => {
    const sorted = getSortedIntArray(count);
    const input = [];
    for (const i of sorted) {
      input.push({ id: i });
    }

    const priorityOrderList = Object.keys(input[0]);

    const result = sortObjectsUniversal(input, priorityOrderList, [true]);
    t.assert(isObjectsSorted(result, priorityOrderList, [true]));

    const result2 = sortObjectsUniversal(input, priorityOrderList, [false]);
    t.assert(isObjectsSorted(result2, priorityOrderList, [false]));
  };

  for (const count of [10, 50, 100, 1_000, 5_000, 10_000, 50_000, 1_000_000]) {
    run(count);
  }
});

test('final sort desc-sorted objects', t => {
  const run = count => {
    const sorted = getSortedIntArray(count, false);
    const input = [];
    for (const i of sorted) {
      input.push({ id: i });
    }

    const priorityOrderList = Object.keys(input[0]);

    const result = sortObjectsUniversal(input, priorityOrderList, [false]);
    t.assert(isObjectsSorted(result, priorityOrderList, [false]));

    const result2 = sortObjectsUniversal(input, priorityOrderList, [true]);
    t.assert(isObjectsSorted(result2, priorityOrderList, [true]));
  };

  for (const count of [10, 50, 100, 1_000, 5_000, 10_000, 50_000, 1_000_000]) {
    run(count);
  }
});
