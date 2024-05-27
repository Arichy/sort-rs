import {
  normalQuickSortNumbers as _normalQuickSortNumbers,
  rayonQuickSortNumbers as _rayonQuickSortNumbers,
  normalQuickSortObjectsUniversal as _normalQuickSortObjectsUniversal,
  rayonQuickSortObjectsUniversal as _rayonQuickSortObjectsUniversal,
  normalQuickSortObjectsWithOnePriorityKey as _normalQuickSortObjectsWithOnePriorityKey,
  rayonQuickSortObjectsWithOnePriorityKey as _rayonQuickSortObjectsWithOnePriorityKey,
  normalQuickSortObjectsWithTwoPriorityKeys as _normalQuickSortObjectsWithTwoPriorityKeys,
  rayonQuickSortObjectsWithTwoPriorityKeys as _rayonQuickSortObjectsWithTwoPriorityKeys,
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

export function normalQuickSortObjectsWithOnePriorityKey<T extends Record<string, any>>(
  objectArray: T[],
  priorityKey: keyof T,
  asc = true
) {
  const priorityList = new Float64Array(objectArray.length);
  const indexList = new Uint32Array(objectArray.length);
  objectArray.forEach((value, index) => {
    if (typeof value[priorityKey] !== 'number') {
      throw new Error('Field must be number');
    }
    priorityList[index] = value[priorityKey] as number;
    indexList[index] = index;
  });

  _normalQuickSortObjectsWithOnePriorityKey(priorityList, indexList, asc);

  const result = [];
  for (let i = 0; i < indexList.length; i++) {
    result.push(objectArray[indexList[i]]);
  }
  return result;
}

export function rayonQuickSortObjectsWithOnePriorityKey<T extends Record<string, any>>(
  objectArray: T[],
  priorityKey: keyof T,
  asc = true
) {
  const priorityList = new Float64Array(objectArray.length);
  const indexList = new Uint32Array(objectArray.length);
  objectArray.forEach((value, index) => {
    if (typeof value[priorityKey] !== 'number') {
      throw new Error('Field must be number');
    }
    priorityList[index] = value[priorityKey] as number;
    indexList[index] = index;
  });

  _rayonQuickSortObjectsWithOnePriorityKey(priorityList, indexList, asc);

  const result = [];
  for (let i = 0; i < indexList.length; i++) {
    result.push(objectArray[indexList[i]]);
  }
  return result;
}

export function normalQuickSortObjectsWithTwoPriorityKeys<T extends Record<string, any>>(
  objectArray: T[],
  priorityKey0: keyof T,
  priorityKey1: keyof T,
  asc0 = true,
  asc1 = true
) {
  const priorityList0 = new Float64Array(objectArray.length);
  const priorityList1 = new Float64Array(objectArray.length);
  const indexList = new Uint32Array(objectArray.length);
  objectArray.forEach((value, index) => {
    if (typeof value[priorityKey0] !== 'number' || typeof value[priorityKey1] !== 'number') {
      throw new Error('Fields must be numbers');
    }
    priorityList0[index] = value[priorityKey0] as number;
    priorityList1[index] = value[priorityKey1] as number;
    indexList[index] = index;
  });

  _normalQuickSortObjectsWithTwoPriorityKeys(priorityList0, priorityList1, indexList, asc0, asc1);

  const result = [];
  for (let i = 0; i < indexList.length; i++) {
    result.push(objectArray[indexList[i]]);
  }
  return result;
}

export function rayonQuickSortObjectsWithTwoPriorityKeys<T extends Record<string, any>>(
  objectArray: T[],
  priorityKey0: keyof T,
  priorityKey1: keyof T,
  asc0 = true,
  asc1 = true
) {
  const priorityList0 = new Float64Array(objectArray.length);
  const priorityList1 = new Float64Array(objectArray.length);
  const indexList = new Uint32Array(objectArray.length);
  objectArray.forEach((value, index) => {
    if (typeof value[priorityKey0] !== 'number' || typeof value[priorityKey1] !== 'number') {
      throw new Error('Fields must be numbers');
    }
    priorityList0[index] = value[priorityKey0] as number;
    priorityList1[index] = value[priorityKey1] as number;
    indexList[index] = index;
  });

  _rayonQuickSortObjectsWithTwoPriorityKeys(priorityList0, priorityList1, indexList, asc0, asc1);

  const result = [];
  for (let i = 0; i < indexList.length; i++) {
    result.push(objectArray[indexList[i]]);
  }
  return result;
}
