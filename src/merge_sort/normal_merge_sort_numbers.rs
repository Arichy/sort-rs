use napi::bindgen_prelude::Float64Array;
use napi_derive::napi;

use super::merge::merge;

#[napi]
fn normal_merge_sort_numbers(mut arr: Float64Array, asc: bool) {
  _normal_merge_sort_numbers(&mut arr, asc);
}

fn _normal_merge_sort_numbers(arr: &mut [f64], asc: bool) {
  if arr.len() <= 1 {
    return;
  }

  let mid = arr.len() / 2;
  let mut left = arr[0..mid].to_vec();
  let mut right = arr[mid..arr.len()].to_vec();
  _normal_merge_sort_numbers(&mut left, asc);
  _normal_merge_sort_numbers(&mut right, asc);
  merge(arr, &left, &right, asc);
}

// #[cfg(test)]
// mod tests {
//   use super::*;

//   #[test]
//   fn test() {
//     let mut arr = vec![3.0, 2.0, 1.0, 4.0, 5.0, 3.0];
//     _normal_merge_sort_numbers(&mut arr, true);

//     assert_eq!(arr, vec![1.0, 2.0, 3.0, 3.0, 4.0, 5.0]);
//   }
// }
