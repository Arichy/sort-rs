import { rayonQuickSortObjectsUniversal, normalQuickSortObjectsUniversal } from './wrappers';

// if size < threshold, use the corresponding method
const THRESHOLD_JS_NATIVE = 300;
const THRESHOLD_RS_NORMAL = 1250;

export const jsSortObjectsUniversal = <T extends Record<string, any>>(
  objectArray: T[],
  priorityOrderList: Array<keyof T>,
  orderList: boolean[]
) => {
  const copied = [...objectArray];
  copied.sort((a, b) => {
    for (let i = 0; i < priorityOrderList.length; i++) {
      const priority = priorityOrderList[i];
      const order = orderList[i];
      const aVal = a[priority];
      const bVal = b[priority];

      if (aVal === bVal) {
        continue;
      }

      return order ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });
  return copied;
};

export function sortObjectsUniversal<T extends Record<string, any>>(
  objectArray: T[],
  priorityOrder: Array<keyof T>,
  orderList: boolean[]
) {
  try {
    if (objectArray.length < THRESHOLD_JS_NATIVE) {
      return jsSortObjectsUniversal(objectArray, priorityOrder, orderList);
    }
    if (objectArray.length < THRESHOLD_RS_NORMAL) {
      return normalQuickSortObjectsUniversal(objectArray, priorityOrder, orderList);
    }
    return rayonQuickSortObjectsUniversal(objectArray, priorityOrder, orderList);
  } catch {
    return jsSortObjectsUniversal(objectArray, priorityOrder, orderList);
  }
}
