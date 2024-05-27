import {
  normalMergeSortNumbers as _normalMergeSortNumbers,
  rayonMergeSortNumbers as _rayonMergeSortNumbers,
  normalMergeSortObjectsUniversal as _normalMergeSortObjectsUniversal,
  rayonMergeSortObjectsUniversal as _rayonMergeSortObjectsUniversal,
} from '../../index';

export function rayonMergeSortNumbers(arr: number[], asc = true) {
  const input = new Float64Array(arr);
  _rayonMergeSortNumbers(input, asc);
  const result = Array.from(input);
  return result;
}

export function normalMergeSortNumbers(arr: number[], asc = true) {
  const input = new Float64Array(arr);
  _normalMergeSortNumbers(input, asc);
  const result = Array.from(input);
  return result;
}

export function normalMergeSortObjectsUniversal<T extends Record<string, any>>(
  objectArray: T[],
  priorityOrderList: Array<keyof T>,
  orderList: boolean[]
) {
  if (priorityOrderList.length !== orderList.length) {
    throw new Error('Priority order and order list must have the same length');
  }

  const priorityList = priorityOrderList.map(() => new Float64Array(objectArray.length));
  const indexList = new Uint32Array(objectArray.length);
  objectArray.forEach((value, index) => {
    priorityList.forEach((priority, i) => {
      if (typeof value[priorityOrderList[i]] !== 'number') {
        throw new Error('Fields must be numbers');
      }
      priority[index] = value[priorityOrderList[i]] as number;
    });
    indexList[index] = index;
  });

  _normalMergeSortObjectsUniversal(priorityList, indexList, orderList);

  const result = [];
  for (let i = 0; i < indexList.length; i++) {
    result.push(objectArray[indexList[i]]);
  }
  return result;
}

export function rayonMergeSortObjectsUniversal<T extends Record<string, any>>(
  objectArray: T[],
  priorityOrderList: Array<keyof T>,
  orderList: boolean[]
) {
  if (priorityOrderList.length !== orderList.length) {
    throw new Error('Priority order and order list must have the same length');
  }
  const priorityList = priorityOrderList.map(() => new Float64Array(objectArray.length));
  const indexList = new Uint32Array(objectArray.length);
  objectArray.forEach((value, index) => {
    priorityList.forEach((priority, i) => {
      if (typeof value[priorityOrderList[i]] !== 'number') {
        throw new Error('Fields must be numbers');
      }
      priority[index] = value[priorityOrderList[i]] as number;
    });
    indexList[index] = index;
  });

  _rayonMergeSortObjectsUniversal(priorityList, indexList, orderList);

  const result = [];
  for (let i = 0; i < indexList.length; i++) {
    result.push(objectArray[indexList[i]]);
  }
  return result;
}
