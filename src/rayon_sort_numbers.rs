use napi::bindgen_prelude::Float64Array;
use napi_derive::napi;
use rayon::join;

use crate::partition::partition;

#[napi]
fn rayon_sort_numbers(mut arr: Float64Array, asc: bool) {
  _rayon_sort_numbers(&mut arr, asc);
}

fn _rayon_sort_numbers<T: PartialOrd + Send>(arr: &mut [T], asc: bool) {
  if arr.len() <= 1 {
    return;
  }

  let mid = partition(arr, asc);
  let (lo, hi) = arr.split_at_mut(mid);
  join(
    || _rayon_sort_numbers(lo, asc),
    || _rayon_sort_numbers(hi, asc),
  );
}
