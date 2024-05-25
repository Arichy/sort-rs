use napi::bindgen_prelude::Float64Array;
use napi_derive::napi;

use crate::partition::partition;

#[napi]
fn normal_sort_numbers(mut arr: Float64Array, asc: bool) {
  _normal_sort_numbers(&mut arr, asc);
}

fn _normal_sort_numbers(arr: &mut [f64], asc: bool) {
  if arr.len() <= 1 {
    return;
  }

  let mid = partition(arr, asc);
  let (lo, hi) = arr.split_at_mut(mid);
  _normal_sort_numbers(lo, asc);
  _normal_sort_numbers(hi, asc);
}
