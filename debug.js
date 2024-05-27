const {
  normalQuickSortNumbers,
  rayonQuickSortNumbers,
  normalQuickSortObjectsUniversal,
  rayonQuickSortObjectsUniversal,
  normalMergeSortObjectsUniversal,
  rayonMergeSortObjectsUniversal,
} = require('./dist');
const {
  getRandomFloat,
  getRandomFloatArray,
  getRandomInt,
  isSorted,
  sortObjects,
  isObjectsSorted,
} = require('./utils');

// const arr1 = [1, 3, 3, 4, 5];
// const arr2 = [5, 4, 3, 2, 1];

// const typedArray1 = new Float64Array(arr1);
// const typedArray2 = new Float64Array(arr2);

// normalSortObjects([typedArray1, typedArray2], new Uint32Array([0, 1, 2, 3, 4]), [true, true]);

// console.log(typedArray1, typedArray2);

const enableId = false;
const getRandomObjectArayy = (objectCount, fieldCount) => {
  const result = [];
  for (let i = 0; i < objectCount; i++) {
    const obj = {};
    if (enableId) obj.id = i;

    for (let j = 0; j < fieldCount; j++) {
      obj[`field${j}`] = getRandomInt(-20, 20);
    }
    result.push(obj);
  }
  return result;
};

const FIELD_COUNT = 5;
const randomObjects = getRandomObjectArayy(300_000, FIELD_COUNT);
// console.log(randomObjects);
const priorityList = Object.keys(randomObjects[0]);
const orderList = new Array(FIELD_COUNT + (enableId ? 1 : 0)).fill(0).map(() => Math.random() > 0.5);
// const priorityList = ['id'];
// const orderList = [false];

// console.log(randomObjects, priorityList, orderList);

{
  console.time('js sort');
  const sorted = sortObjects(randomObjects, priorityList, orderList);
  console.timeEnd('js sort');
  // jsResult = sorted;
  console.log(isObjectsSorted(sorted, priorityList, orderList));
}

{
  console.time('rust normal quick sort');
  const rustResult = normalQuickSortObjectsUniversal(randomObjects, priorityList, orderList);
  console.timeEnd('rust normal quick sort');
  console.log(isObjectsSorted(rustResult, priorityList, orderList));
  // const isSame = rustResult.every((obj, i) => {
  //   const jsObj = jsResult[i];
  //   return jsObj.id === obj.id;
  // });
  // console.log(isSame);
}

{
  console.time('rust rayon quick sort');
  const rustResult = rayonQuickSortObjectsUniversal(randomObjects, priorityList, orderList);
  console.timeEnd('rust rayon quick sort');
  console.log(isObjectsSorted(rustResult, priorityList, orderList));
}

{
  console.time('rust normal merge sort');
  const rustResult = normalMergeSortObjectsUniversal(randomObjects, priorityList, orderList);
  console.timeEnd('rust normal merge sort');
  console.log(isObjectsSorted(rustResult, priorityList, orderList));
}

{
  console.time('rust rayon merge sort');
  const rustResult = rayonMergeSortObjectsUniversal(randomObjects, priorityList, orderList);
  console.timeEnd('rust rayon merge sort');
  console.log(isObjectsSorted(rustResult, priorityList, orderList));
}

const objects = [
  {
    id: 0,
    price: 4.0,
    created_at: 1,
    updated_at: 4,
    name: 'Alice',
  },
  {
    id: 1,
    price: 3.0,
    created_at: 2,
    updated_at: 3,
    name: 'Alice',
  },
  {
    id: 2,
    price: 5.6,
    created_at: 3,
    updated_at: 2,
    name: 'Bob',
  },
  {
    id: 3,
    price: 3.0,
    created_at: 4,
    updated_at: 2,
    name: 'Alice',
  },
  {
    id: 4,
    price: 3.0,
    created_at: 4,
    updated_at: 1,
    name: 'Charlie',
  },
  {
    id: 5,
    price: 3.0,
    created_at: 4,
    updated_at: 1,
    name: 'Alicf',
  },
];

// const sorted = sortObjects(objects, ['price', 'created_at', 'updated_at'], [true, true, true]);
// console.log(sorted);
// console.log(isObjectsSorted(sorted, ['price', 'created_at', 'updated_at'], [true, true, true]));

// const result = normalSortObjectsStable(objects, ['price', 'created_at', 'updated_at'], [true, false, false]);
// const result = normalSortObjectsStable(objects, ['price', 'created_at', 'updated_at'], [true, true, true]);
// console.log(result);
