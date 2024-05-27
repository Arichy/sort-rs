import {
  normalQuickSortNumbers as _normalQuickSortNumbers,
  rayonQuickSortNumbers as _rayonQuickSortNumbers,
  normalQuickSortObjectsUniversal as _normalQuickSortObjectsUniversal,
  rayonQuickSortObjectsUniversal as _rayonQuickSortObjectsUniversal,
} from '../../index';

export function rayonQuickSortNumbers(arr: number[], asc = true) {
  const input = new Float64Array(arr);
  _rayonQuickSortNumbers(input, asc);
  const result = Array.from(input);
  return result;
}

export function normalQuickSortNumbers(arr: number[], asc = true) {
  const input = new Float64Array(arr);
  _normalQuickSortNumbers(input, asc);
  const result = Array.from(input);
  return result;
}

export function normalQuickSortObjectsUniversal<T extends Record<string, any>>(
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

  _normalQuickSortObjectsUniversal(priorityList, indexList, orderList);

  const result = [];
  for (let i = 0; i < indexList.length; i++) {
    result.push(objectArray[indexList[i]]);
  }
  return result;
}

export function rayonQuickSortObjectsUniversal<T extends Record<string, any>>(
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

  _rayonQuickSortObjectsUniversal(priorityList, indexList, orderList);

  const result = [];
  for (let i = 0; i < indexList.length; i++) {
    result.push(objectArray[indexList[i]]);
  }
  return result;
}
