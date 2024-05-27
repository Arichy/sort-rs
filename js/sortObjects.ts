import {
  normalQuickSortObjectsWithOnePriorityKey,
  rayonQuickSortObjectsWithOnePriorityKey,
  normalQuickSortObjectsWithTwoPriorityKeys,
  rayonQuickSortObjectsWithTwoPriorityKeys,
} from './wrappers';
import { jsSortObjectsUniversal, sortObjectsUniversal } from './sortObjectsUniversal';

const THRESHOLD_ONE_KEY_JS_NATIVE = 35;
const THRESHOLD_ONE_KEY_RS_NORMAL = 5000;
function sortObjectsWithOneKey<T extends Record<string, any>>(objectArray: T[], key: keyof T, asc: boolean) {
  if (objectArray.length < THRESHOLD_ONE_KEY_JS_NATIVE) {
    const copied = [...objectArray];
    copied.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      return asc ? aVal - bVal : bVal - aVal;
    });
    return copied;
  }

  if (objectArray.length < THRESHOLD_ONE_KEY_RS_NORMAL) {
    return normalQuickSortObjectsWithOnePriorityKey(objectArray, key, asc);
  }

  return rayonQuickSortObjectsWithOnePriorityKey(objectArray, key, asc);
}

const THRESHOLD_TWO_KEYS_JS_NATIVE = 40;
const THRESHOLD_TWO_KEYS_RS_NORMAL = 3500;
function sortObjectsWithTwoKeys<T extends Record<string, any>>(
  objectArray: T[],
  key1: keyof T,
  key2: keyof T,
  asc1: boolean,
  asc2: boolean
) {
  if (objectArray.length < THRESHOLD_TWO_KEYS_JS_NATIVE) {
    const copied = [...objectArray];
    copied.sort((a, b) => {
      const aVal1 = a[key1];
      const bVal1 = b[key1];
      if (aVal1 !== bVal1) {
        return asc1 ? aVal1 - bVal1 : bVal1 - aVal1;
      }

      const aVal2 = a[key2];
      const bVal2 = b[key2];
      return asc2 ? aVal2 - bVal2 : bVal2 - aVal2;
    });
    return copied;
  }

  if (objectArray.length < THRESHOLD_TWO_KEYS_RS_NORMAL) {
    return normalQuickSortObjectsWithTwoPriorityKeys(objectArray, key1, key2, asc1, asc2);
  }

  return rayonQuickSortObjectsWithTwoPriorityKeys(objectArray, key1, key2, asc1, asc2);
}

export function sortObjects<T extends Record<string, any>>(
  objectArray: T[],
  priorityOrder: Array<keyof T>,
  orderList: boolean[]
) {
  try {
    if (priorityOrder.length === 1) {
      return sortObjectsWithOneKey(objectArray, priorityOrder[0], orderList[0]);
    }
    if (priorityOrder.length === 2) {
      return sortObjectsWithTwoKeys(objectArray, priorityOrder[0], priorityOrder[1], orderList[0], orderList[1]);
    }
    return sortObjectsUniversal(objectArray, priorityOrder, orderList);
  } catch (err) {
    return jsSortObjectsUniversal(objectArray, priorityOrder, orderList);
  }
}
