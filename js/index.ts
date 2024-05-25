import { normalSortNumbers as _normalSortNumbers, rayonSortNumbers as _rayonSortNumbers } from '../index';

export function rayonSortNumbers(arr: number[], asc = true) {
  const input = new Float64Array(arr);
  _rayonSortNumbers(input, asc);
  const result = Array.from(input);
  return result;
}

export function normalSortNumbers(arr: number[], asc = true) {
  const input = new Float64Array(arr);
  _normalSortNumbers(input, asc);
  const result = Array.from(input);
  return result;
}

// if size < threshold, use the corresponding method
const ASC_THRESHOLD_JS_NATIVE = 25;
const ASC_THRESHOLD_JS_TYPED_ARRAY = 70;
const ASC_THRESHOLD_RS_NORMAL = 4000;
const DESC_THRESHOLD_JS_NATIVE = 30;
const DESC_THRESHOLD_RS_NORMAL = 4000;
export function sortNumbers(arr: number[], asc = true) {
  if (asc) {
    if (arr.length < ASC_THRESHOLD_JS_NATIVE) {
      const copy = [...arr];
      copy.sort((a, b) => a - b);
      return copy;
    }
    if (arr.length < ASC_THRESHOLD_JS_TYPED_ARRAY) {
      const input = new Float64Array(arr);
      input.sort();
      return Array.from(input);
    }
    if (arr.length < ASC_THRESHOLD_RS_NORMAL) {
      return normalSortNumbers(arr, true);
    }
    return rayonSortNumbers(arr, true);
  } else {
    if (arr.length < DESC_THRESHOLD_JS_NATIVE) {
      const copy = [...arr];
      copy.sort((a, b) => b - a);
      return copy;
    }
    if (arr.length < DESC_THRESHOLD_RS_NORMAL) {
      return normalSortNumbers(arr, false);
    }
    return rayonSortNumbers(arr, false);
  }
}
