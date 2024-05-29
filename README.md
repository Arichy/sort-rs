# Sort in Node.js with Rust

A fast and safe sorting library implemented in Rust and exposed to Node.js.

In small arrays, it's not so performant compared to the native JavaScript `Array.prototype.sort` method. But in large arrays, it's much faster.

For now it only supports sorting numbers and objects in number fields.

Recommended to use when the array size is larger than `1_000` elements.

# Installation

```bash
pnpm add arichy/sort-rs-core
```

or

```bash
yarn add arichy/sort-rs-core
```

# Quick Start

### For numbers:

```typescript
import { sortNumbers } from '@arichy/sort-rs-core';

const isSorted = (arr: number[], asc: boolean) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if ((asc && arr[i] > arr[i + 1]) || (!asc && arr[i] < arr[i + 1])) {
      return false;
    }
  }
  return true;
};

const numbers = [
  3.14, 2.718, -1.414, 0.577, -3.333, 4.669, 1.618, 2.303, -2.236, 3.1415, 1.4142, -2.718, 0.693, 1.732, -3.14, 2.645,
  -0.577, 3.333, -4.669, 0.301, 42, -10, 17, 0, -5, 42, 100, -100, 17, 0, 42,
];

// test asc
const sortedNumbersAsc = sortNumbers(numbers);
console.log(sortedNumbersAsc);
console.log(isSorted(sortedNumbersAsc, true));

// test desc
const sortedNumbersDesc = sortNumbers(numbers, false);
console.log(sortedNumbersDesc);
console.log(isSorted(sortedNumbersDesc, false));
```

#### Output

```javascript
[
  -100, -10, -5, -4.669, -3.333, -3.14, -2.718, -2.236, -1.414, -0.577, 0, 0, 0.301, 0.577, 0.693, 1.4142, 1.618, 1.732,
  2.303, 2.645, 2.718, 3.14, 3.1415, 3.333, 4.669, 17, 17, 42, 42, 42, 100,
];
true[
  (100,
  42,
  42,
  42,
  17,
  17,
  4.669,
  3.333,
  3.1415,
  3.14,
  2.718,
  2.645,
  2.303,
  1.732,
  1.618,
  1.4142,
  0.693,
  0.577,
  0.301,
  0,
  0,
  -0.577,
  -1.414,
  -2.236,
  -2.718,
  -3.14,
  -3.333,
  -4.669,
  -5,
  -10,
  -100)
];
true;
```

### For objects:

```typescript
import { sortObjects } from '@arichy/sort-rs-core';

const isObjectsSorted = <T>(arr: T[], priorityList: Array<keyof T>, orderList: boolean[]) => {
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < priorityList.length; j++) {
      const priority = priorityList[j];
      const order = orderList[j];
      const a = arr[i - 1][priority];
      const b = arr[i][priority];
      if ((order && a > b) || (!order && a < b)) {
        return false;
      }
      if (a === b) {
        continue;
      } else {
        break;
      }
    }
  }
  return true;
};

// consider we have an array of products:
const items = [
  { id: 1, name: 'Item A', price: 19.99, createDate: 20230101 },
  { id: 2, name: 'Item B', price: 29.99, createDate: 20230102 },
  { id: 3, name: 'Item C', price: 19.99, createDate: 20230101 },
  { id: 4, name: 'Item D', price: 39.99, createDate: 20230103 },
  { id: 5, name: 'Item E', price: 19.99, createDate: 20230102 },
  { id: 6, name: 'Item F', price: 29.99, createDate: 20230101 },
  { id: 7, name: 'Item G', price: 39.99, createDate: 20230102 },
  { id: 8, name: 'Item H', price: 19.99, createDate: 20230103 },
  { id: 9, name: 'Item I', price: 29.99, createDate: 20230102 },
  { id: 10, name: 'Item J', price: 39.99, createDate: 20230101 },
];

// sort the products by price in ascending order, then by createDate in descending order
const sortedItems = sortObjects(items, ['price', 'createDate'], [true, false]);

console.log(sortedItems);
console.log(isObjectsSorted(sortedItems, ['price', 'createDate'], [true, false]));
```

#### Output

```javascript
[
  { id: 8, name: 'Item H', price: 19.99, createDate: 20230103 },
  { id: 5, name: 'Item E', price: 19.99, createDate: 20230102 },
  { id: 1, name: 'Item A', price: 19.99, createDate: 20230101 },
  { id: 3, name: 'Item C', price: 19.99, createDate: 20230101 },
  { id: 2, name: 'Item B', price: 29.99, createDate: 20230102 },
  { id: 9, name: 'Item I', price: 29.99, createDate: 20230102 },
  { id: 6, name: 'Item F', price: 29.99, createDate: 20230101 },
  { id: 4, name: 'Item D', price: 39.99, createDate: 20230103 },
  { id: 7, name: 'Item G', price: 39.99, createDate: 20230102 },
  { id: 10, name: 'Item J', price: 39.99, createDate: 20230101 },
];
true;
```

# Benchmark

Tested on MacBook Pro (Apple M1 Pro, 32GB memory) with Node.js `v20.11.1`.

## Sorting numbers

Array size: `1_000`

| (index) | Name                    | Ops/sec      | Mean time  | Margin of Error | Samples |
| ------- | ----------------------- | ------------ | ---------- | --------------- | ------- |
| 0       | js native sort asc      | `6,553.751`  | `0.153 ms` | ±0.68%          | 96      |
| 1       | js typed array sort asc | `19,759.561` | `0.051 ms` | ±2.84%          | 11      |
| 2       | rust sort asc           | `24,843.826` | `0.040 ms` | ±2.61%          | 12      |

Array size: `10_000`

| (index) | Name                    | Ops/sec     | Mean time  | Margin of Error | Samples |
| ------- | ----------------------- | ----------- | ---------- | --------------- | ------- |
| 0       | js native sort asc      | `488.256`   | `2.048 ms` | ±0.52%          | 93      |
| 1       | js typed array sort asc | `1,141.465` | `0.876 ms` | ±31.61%         | 12      |
| 2       | rust sort asc           | `2,072.872` | `0.482 ms` | ±5.76%          | 14      |

Array size: `100_000`

| (index) | Name                    | Ops/sec   | Mean time   | Margin of Error | Samples |
| ------- | ----------------------- | --------- | ----------- | --------------- | ------- |
| 0       | js native sort asc      | `29.342`  | `34.081 ms` | ±1.05%          | 53      |
| 1       | js typed array sort asc | `104.052` | `9.611 ms`  | ±0.70%          | 12      |
| 2       | rust sort asc           | `258.118` | `3.874 ms`  | ±0.76%          | 13      |

Array size: `1_000_000`

| (index) | Name                    | Ops/sec  | Mean time    | Margin of Error | Samples |
| ------- | ----------------------- | -------- | ------------ | --------------- | ------- |
| 0       | js native sort asc      | `2.258`  | `442.948 ms` | ±6.97%          | 10      |
| 1       | js typed array sort asc | `8.833`  | `113.216 ms` | ±2.89%          | 7       |
| 2       | rust sort asc           | `23.373` | `42.784 ms`  | ±7.53%          | 8       |

Array size: `10_000_000`

| (index) | Name                    | Ops/sec | Mean time     | Margin of Error | Samples |
| ------- | ----------------------- | ------- | ------------- | --------------- | ------- |
| 0       | js native sort asc      | `0.146` | `6866.381 ms` | ±1.79%          | 5       |
| 1       | js typed array sort asc | `0.801` | `1248.767 ms` | ±0.23%          | 5       |
| 2       | rust sort asc           | `2.513` | `397.973 ms`  | ±4.99%          | 5       |

## Sorting objects

Array size: `1_000`, Fields count to sort by: `1`

| (index) | Name      | Ops/sec      | Mean time  | Margin of Error | Samples |
| ------- | --------- | ------------ | ---------- | --------------- | ------- |
| 0       | js sort   | `6,613.026`  | `0.151 ms` | ±1.52%          | 97      |
| 1       | rust sort | `21,903.858` | `0.046 ms` | ±1.23%          | 86      |

Array size: `1_000`, Fields count to sort by: `2`

| (index) | Name      | Ops/sec      | Mean time  | Margin of Error | Samples |
| ------- | --------- | ------------ | ---------- | --------------- | ------- |
| 0       | js sort   | `3,174.98`   | `0.315 ms` | ±0.91%          | 97      |
| 1       | rust sort | `14,083.464` | `0.071 ms` | ±0.73%          | 94      |

Array size: `1_000`, Fields count to sort by: `3`

| (index) | Name      | Ops/sec     | Mean time  | Margin of Error | Samples |
| ------- | --------- | ----------- | ---------- | --------------- | ------- |
| 0       | js sort   | `3,181.189` | `0.314 ms` | ±0.17%          | 96      |
| 1       | rust sort | `4,839.796` | `0.207 ms` | ±0.49%          | 96      |

Array size: `10_000`, Fields count to sort by: `1`

| (index) | Name      | Ops/sec     | Mean time  | Margin of Error | Samples |
| ------- | --------- | ----------- | ---------- | --------------- | ------- |
| 0       | js sort   | `264.921`   | `3.775 ms` | ±0.27%          | 91      |
| 1       | rust sort | `1,694.155` | `0.590 ms` | ±1.77%          | 89      |

Array size: `10_000`, Fields count to sort by: `2`

| (index) | Name      | Ops/sec     | Mean time  | Margin of Error | Samples |
| ------- | --------- | ----------- | ---------- | --------------- | ------- |
| 0       | js sort   | `220.105`   | `4.543 ms` | ±0.63%          | 87      |
| 1       | rust sort | `1,298.966` | `0.770 ms` | ±2.10%          | 89      |

Array size: `10_000`, Fields count to sort by: `3`

| (index) | Name      | Ops/sec   | Mean time  | Margin of Error | Samples |
| ------- | --------- | --------- | ---------- | --------------- | ------- |
| 0       | js sort   | `208.474` | `4.797 ms` | ±1.37%          | 90      |
| 1       | rust sort | `616.607` | `1.622 ms` | ±5.84%          | 85      |

Array size: `100_000`, Fields count to sort by: `1`

| (index) | Name      | Ops/sec     | Mean time  | Margin of Error | Samples |
| ------- | --------- | ----------- | ---------- | --------------- | ------- |
| 0       | js sort   | `491.931`   | `2.033 ms` | ±2.21%          | 94      |
| 1       | rust sort | `2,192.555` | `0.456 ms` | ±2.31%          | 89      |

Array size: `100_000`, Fields count to sort by: `2`

| (index) | Name      | Ops/sec     | Mean time  | Margin of Error | Samples |
| ------- | --------- | ----------- | ---------- | --------------- | ------- |
| 0       | js sort   | `234.551`   | `4.263 ms` | ±0.20%          | 93      |
| 1       | rust sort | `1,322.701` | `0.756 ms` | ±1.27%          | 93      |

Array size: `100_000`, Fields count to sort by: `3`

| (index) | Name      | Ops/sec   | Mean time  | Margin of Error | Samples |
| ------- | --------- | --------- | ---------- | --------------- | ------- |
| 0       | js sort   | `229.617` | `4.355 ms` | ±0.28%          | 91      |
| 1       | rust sort | `619.536` | `1.614 ms` | ±6.01%          | 84      |

Array size: `1_000_000`, Fields count to sort by: `1`

| (index) | Name      | Ops/sec | Mean time    | Margin of Error | Samples |
| ------- | --------- | ------- | ------------ | --------------- | ------- |
| 0       | js sort   | `1.779` | `562.219 ms` | ±3.74%          | 9       |
| 1       | rust sort | `7.519` | `132.992 ms` | ±6.54%          | 24      |

Array size: `1_000_000`, Fields count to sort by: `2`

| (index) | Name      | Ops/sec | Mean time     | Margin of Error | Samples |
| ------- | --------- | ------- | ------------- | --------------- | ------- |
| 0       | js sort   | `0.695` | `1438.288 ms` | ±2.83%          | 6       |
| 1       | rust sort | `4.082` | `244.962 ms`  | ±3.93%          | 15      |

Array size: `1_000_000`, Fields count to sort by: `3`

| (index) | Name      | Ops/sec | Mean time     | Margin of Error | Samples |
| ------- | --------- | ------- | ------------- | --------------- | ------- |
| 0       | js sort   | `0.583` | `1714.905 ms` | ±8.84%          | 6       |
| 1       | rust sort | `2.753` | `363.227 ms`  | ±5.22%          | 11      |

Array size: `5_000_000`, Fields count to sort by: `1`

| (index) | Name      | Ops/sec | Mean time     | Margin of Error | Samples |
| ------- | --------- | ------- | ------------- | --------------- | ------- |
| 0       | js sort   | `0.594` | `1682.883 ms` | ±5.40%          | 5       |
| 1       | rust sort | `1.837` | `544.266 ms`  | ±6.26%          | 9       |

Array size: `5_000_000`, Fields count to sort by: `2`

| (index) | Name      | Ops/sec | Mean time      | Margin of Error | Samples |
| ------- | --------- | ------- | -------------- | --------------- | ------- |
| 0       | js sort   | `0.096` | `10458.968 ms` | ±2.43%          | 5       |
| 1       | rust sort | `0.602` | `1661.676 ms`  | ±6.09%          | 6       |

Array size: `5_000_000`, Fields count to sort by: `3`

| (index) | Name      | Ops/sec | Mean time      | Margin of Error | Samples |
| ------- | --------- | ------- | -------------- | --------------- | ------- |
| 0       | js sort   | `0.088` | `11356.917 ms` | ±3.59%          | 5       |
| 1       | rust sort | `0.356` | `2810.002 ms`  | ±40.29%         | 6       |
