import test from 'ava';

import {
  normalQuickSortObjectsUniversal,
  rayonQuickSortObjectsUniversal,
  normalQuickSortObjectsWithOnePriorityKey,
  rayonQuickSortObjectsWithOnePriorityKey,
  normalQuickSortObjectsWithTwoPriorityKeys,
  rayonQuickSortObjectsWithTwoPriorityKeys,
  normalQuickSortObjectsCommon,
  rayonQuickSortObjectsCommon,
} from '../dist/index.js';
import { getRandomFloat, getRandomInt, getSortedIntArray, isObjectsSorted } from '../utils.js';

const FIELD_COUNT = 3;
let enableId = false;
const getRandomObjectArray = (objectCount, fieldCount) => {
  const result = [];
  for (let i = 0; i < objectCount; i++) {
    const obj = {};
    if (enableId) obj.id = i;

    for (let j = 0; j < fieldCount; j++) {
      obj[`field${j}`] = j === 0 ? getRandomInt(-1000, 100) : getRandomFloat(-1000, 1000);
    }
    result.push(obj);
  }
  return result;
};

const counts = [10, 30, 50, 100, 1_000, 5_000, 10_000];

// sort objects
test('normal quick sort objects', t => {
  const run = count => {
    const input = getRandomObjectArray(count, FIELD_COUNT);

    const priorityOrderList = Object.keys(input[0]);
    const orderList = new Array(FIELD_COUNT + (enableId ? 1 : 0)).fill(0).map(() => Math.random() > 0.5);
    const result = normalQuickSortObjectsUniversal(input, priorityOrderList, orderList);
    t.assert(isObjectsSorted(result, priorityOrderList, orderList));
  };

  for (const count of counts) {
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

  for (const count of counts) {
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

  for (const count of counts) {
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

  for (const count of counts) {
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

  for (const count of counts) {
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

  for (const count of counts) {
    run(count);
  }
});

test('normal quick sort objects with one priority key', t => {
  const run = count => {
    const input = getRandomObjectArray(count, FIELD_COUNT);

    {
      const result = normalQuickSortObjectsWithOnePriorityKey(input, 'field0', true);
      t.assert(isObjectsSorted(result, 'field0', true));
    }

    {
      const result = normalQuickSortObjectsWithOnePriorityKey(input, 'field0', false);
      t.assert(isObjectsSorted(result, 'field0', false));
    }
  };

  for (const count of counts) {
    run(count);
  }
});

test('rayon quick sort objects with one priority key', t => {
  const run = count => {
    const input = getRandomObjectArray(count, FIELD_COUNT);

    {
      const result = rayonQuickSortObjectsWithOnePriorityKey(input, 'field0', true);
      t.assert(isObjectsSorted(result, 'field0', true));
    }

    {
      const result = rayonQuickSortObjectsWithOnePriorityKey(input, 'field0', false);
      t.assert(isObjectsSorted(result, 'field0', false));
    }
  };

  for (const count of counts) {
    run(count);
  }
});

test('normal quick sort objects with two priority keys', t => {
  const run = count => {
    const input = getRandomObjectArray(count, FIELD_COUNT);

    {
      const result = normalQuickSortObjectsWithTwoPriorityKeys(input, 'field0', 'field1', true, true);
      t.assert(isObjectsSorted(result, ['field0', 'field1'], [true, true]));
    }

    {
      const result = normalQuickSortObjectsWithTwoPriorityKeys(input, 'field0', 'field1', true, false);
      t.assert(isObjectsSorted(result, ['field0', 'field1'], [true, false]));
    }

    {
      const result = normalQuickSortObjectsWithTwoPriorityKeys(input, 'field0', 'field1', false, true);
      t.assert(isObjectsSorted(result, ['field0', 'field1'], [false, true]));
    }

    {
      const result = normalQuickSortObjectsWithTwoPriorityKeys(input, 'field0', 'field1', false, false);
      t.assert(isObjectsSorted(result, ['field0', 'field1'], [false, false]));
    }
  };

  for (const count of counts) {
    run(count);
  }
});

test('rayon quick sort objects with two priority keys', t => {
  const run = count => {
    const input = getRandomObjectArray(count, FIELD_COUNT);

    {
      const result = rayonQuickSortObjectsWithTwoPriorityKeys(input, 'field0', 'field1', true, true);
      t.assert(isObjectsSorted(result, ['field0', 'field1'], [true, true]));
    }

    {
      const result = rayonQuickSortObjectsWithTwoPriorityKeys(input, 'field0', 'field1', true, false);
      t.assert(isObjectsSorted(result, ['field0', 'field1'], [true, false]));
    }

    {
      const result = rayonQuickSortObjectsWithTwoPriorityKeys(input, 'field0', 'field1', false, true);
      t.assert(isObjectsSorted(result, ['field0', 'field1'], [false, true]));
    }

    {
      const result = rayonQuickSortObjectsWithTwoPriorityKeys(input, 'field0', 'field1', false, false);
      t.assert(isObjectsSorted(result, ['field0', 'field1'], [false, false]));
    }
  };

  for (const count of counts) {
    run(count);
  }
});

test.skip('normal quick sort objects common', t => {
  const run = count => {
    const input = getRandomObjectArray(count, FIELD_COUNT);

    const priorityOrderList = Object.keys(input[0]);
    const orderList = new Array(FIELD_COUNT + (enableId ? 1 : 0)).fill(0).map(() => Math.random() > 0.5);
    const result = normalQuickSortObjectsCommon(input, priorityOrderList, orderList);
    t.assert(isObjectsSorted(result, priorityOrderList, orderList));
  };

  for (const count of counts) {
    run(count);
  }
});

test.skip('rayon quick sort  objects common', t => {
  const run = count => {
    const input = getRandomObjectArray(count, FIELD_COUNT);

    const priorityOrderList = Object.keys(input[0]);
    const orderList = new Array(FIELD_COUNT + (enableId ? 1 : 0)).fill(0).map(() => Math.random() > 0.5);
    const result = rayonQuickSortObjectsCommon(input, priorityOrderList, orderList);
    t.assert(isObjectsSorted(result, priorityOrderList, orderList));
  };

  for (const count of counts) {
    run(count);
  }
});
