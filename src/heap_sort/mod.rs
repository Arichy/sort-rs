use napi::bindgen_prelude::Float64Array;
use napi_derive::napi;

#[napi]
pub fn heap_sort(mut arr: Float64Array) {
  let len = arr.len();
  for start in (0..len / 2).rev() {
    sift_down(&mut arr, start, len - 1);
  }
  for end in (1..len).rev() {
    arr.swap(0, end);
    sift_down(&mut arr, 0, end - 1);
  }
}

fn sift_down<T: PartialOrd>(arr: &mut [T], start: usize, end: usize) {
  let mut root = start;
  while 2 * root + 1 <= end {
    let child = 2 * root + 1;
    let mut swap = root;
    if arr[swap] < arr[child] {
      swap = child;
    }
    if child + 1 <= end && arr[swap] < arr[child + 1] {
      swap = child + 1;
    }
    if swap == root {
      return;
    } else {
      arr.swap(root, swap);
      root = swap;
    }
  }
}
