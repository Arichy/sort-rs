import test from 'ava';

import { sortObjects, sortObjectsUniversal } from '../dist/index.js';
import { getRandomFloat, getSortedIntArray, isObjectsSorted } from '../utils.js';

const getRandomObjectArray = (count, fieldCount) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const obj = {};
    obj.id = i;

    for (let j = 0; j < fieldCount; j++) {
      obj[`field${j}`] = getRandomFloat(-1000, 100);
    }
    result.push(obj);
  }
  return result;
};

const counts = [10, 30, 50, 100, 1_000, 5_000, 10_000];

test('final sort objects', t => {
  const run = (count, fieldCount) => {
    const input = getRandomObjectArray(count, fieldCount);

    const priorityOrderList = Object.keys(input[0]);
    const orderList = new Array(fieldCount).fill(0).map(() => Math.random() > 0.5);
    const result = sortObjects(input, priorityOrderList, orderList);
    t.assert(isObjectsSorted(result, priorityOrderList, orderList));
  };

  const fieldCounts = [1, 2, 3];
  for (const count of counts) {
    for (const fieldCount of fieldCounts) {
      run(count, fieldCount);
    }
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

  for (const count of counts) {
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

  for (const count of counts) {
    run(count);
  }
});
