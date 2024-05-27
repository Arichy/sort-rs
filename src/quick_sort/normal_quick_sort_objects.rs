use super::partition::{
  partition, partition_objcts_with_one_priority_key, partition_objects_universal,
  partition_objects_with_two_priority_keys,
};
use napi::bindgen_prelude::{Float64Array, Uint32Array};
use napi_derive::napi;

#[napi]
fn normal_quick_sort_objects_with_one_priority_key(
  mut priority_key: Float64Array,
  mut index_list: Uint32Array,
  asc: bool,
) {
  _normal_quick_sort_objects_with_one_priority_key(&mut priority_key, &mut index_list, asc);
}

fn _normal_quick_sort_objects_with_one_priority_key(
  priority_key: &mut [f64],
  index_list: &mut [u32],
  asc: bool,
) {
  if priority_key.len() <= 1 {
    return;
  }

  let mid = partition_objcts_with_one_priority_key(priority_key, index_list, asc);
  let (lo, hi) = priority_key.split_at_mut(mid);
  let hi = &mut hi[1..];

  let (lo_index, hi_index) = index_list.split_at_mut(mid);
  let hi_index = &mut hi_index[1..];

  _normal_quick_sort_objects_with_one_priority_key(lo, lo_index, asc);
  _normal_quick_sort_objects_with_one_priority_key(hi, hi_index, asc);
}

#[napi]
fn normal_quick_sort_objects_with_two_priority_keys(
  mut priority_key0: Float64Array,
  mut priority_key1: Float64Array,
  mut index_list: Uint32Array,
  asc0: bool,
  asc1: bool,
) {
  _normal_quick_sort_objects_with_two_priority_keys(
    &mut priority_key0,
    &mut priority_key1,
    &mut index_list,
    asc0,
    asc1,
  );
}

fn _normal_quick_sort_objects_with_two_priority_keys(
  priority_key0: &mut [f64],
  priority_key1: &mut [f64],
  index_list: &mut [u32],
  asc0: bool,
  asc1: bool,
) {
  if priority_key0.len() <= 1 {
    return;
  }

  let mid =
    partition_objects_with_two_priority_keys(priority_key0, priority_key1, index_list, asc0, asc1);
  let (lo0, hi0) = priority_key0.split_at_mut(mid);
  let hi0 = &mut hi0[1..];

  let (lo1, hi1) = priority_key1.split_at_mut(mid);
  let hi1 = &mut hi1[1..];

  let (lo_index, hi_index) = index_list.split_at_mut(mid);
  let hi_index = &mut hi_index[1..];

  _normal_quick_sort_objects_with_two_priority_keys(lo0, lo1, lo_index, asc0, asc1);
  _normal_quick_sort_objects_with_two_priority_keys(hi0, hi1, hi_index, asc0, asc1);
}

#[napi]
fn normal_quick_sort_objects_universal(
  mut priority_list: Vec<Float64Array>,
  mut index_list: Uint32Array,
  order_list: Vec<bool>,
) {
  let mut result: Vec<&mut [f64]> = Vec::with_capacity(priority_list.len());
  for priority in priority_list.iter_mut() {
    result.push(priority);
  }

  _normal_quick_sort_objects_universal(&mut result, &mut index_list, &order_list);
}

fn _normal_quick_sort_objects_universal(
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

  _normal_quick_sort_objects_universal(&mut lo_list, lo_index, order_list);
  _normal_quick_sort_objects_universal(&mut hi_list, hi_index, order_list);
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_sorted() {
    let mut priority0 = vec![];

    let mut index_list = vec![];
    const COUNT: usize = 10000;
    for i in 0..COUNT {
      priority0.push(i as f64);

      index_list.push(i as u32);
    }

    let index_list_cloned = index_list.clone();
    index_list.reverse();

    let mut arr: Vec<&mut [f64]> = vec![];
    arr.push(&mut priority0);

    let order_list = vec![false];

    _normal_quick_sort_objects_universal(&mut arr, &mut index_list, &order_list);

    assert_eq!(index_list, index_list_cloned);
  }

  #[test]
  fn test_desc_sorted() {
    let mut priority0 = vec![];

    let mut index_list = vec![];
    const COUNT: usize = 1_000_000;
    for i in 0..COUNT {
      priority0.push(i as f64);

      index_list.push(i as u32);
    }
    priority0.reverse();

    let index_list_cloned = index_list.clone();

    let mut arr: Vec<&mut [f64]> = vec![];
    arr.push(&mut priority0);

    let order_list = vec![false];

    _normal_quick_sort_objects_universal(&mut arr, &mut index_list, &order_list);

    assert_eq!(index_list, index_list_cloned);
  }
}
