use napi::bindgen_prelude::{Float64Array, Uint32Array};
use napi_derive::napi;
use rayon::join;

use super::partition::partition_objects_universal;

#[napi]
fn rayon_quick_sort_objects_universal(
  mut priority_list: Vec<Float64Array>,
  mut index_list: Uint32Array,
  order_list: Vec<bool>,
) {
  let mut result: Vec<&mut [f64]> = Vec::with_capacity(priority_list.len());
  for priority in priority_list.iter_mut() {
    result.push(priority);
  }

  _rayon_quick_sort_objects_universal(&mut result, &mut index_list, &order_list);
}

fn _rayon_quick_sort_objects_universal(
  priority_list: &mut [&mut [f64]],
  index_list: &mut [u32],
  order_list: &[bool],
) {
  if priority_list[0].len() <= 1 {
    return;
  }

  let mid = partition_objects_universal(priority_list, index_list, order_list);
  let mut lo_list = vec![];
  let mut hi_list = vec![];
  for key in priority_list.iter_mut() {
    let (lo, hi) = key.split_at_mut(mid);
    let hi = &mut hi[1..];
    lo_list.push(lo);
    hi_list.push(hi);
  }

  let (lo_index, hi_index) = index_list.split_at_mut(mid);
  let hi_index = &mut hi_index[1..];

  join(
    || _rayon_quick_sort_objects_universal(&mut lo_list, lo_index, order_list),
    || _rayon_quick_sort_objects_universal(&mut hi_list, hi_index, order_list),
  );
}
