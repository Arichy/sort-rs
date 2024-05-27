use napi::bindgen_prelude::{Float64Array, Uint32Array};
use napi_derive::napi;
use rayon::join;

use super::merge::merge_objects;

#[napi]
fn rayon_merge_sort_objects_universal(
  mut priority_list: Vec<Float64Array>,
  mut index_list: Uint32Array,
  order_list: Vec<bool>,
) {
  let mut result: Vec<&mut [f64]> = Vec::with_capacity(priority_list.len());
  for priority in priority_list.iter_mut() {
    result.push(priority);
  }

  _rayon_merge_sort_objects_universal(&mut result, &mut index_list, &order_list);
}

fn _rayon_merge_sort_objects_universal(
  priority_list: &mut [&mut [f64]],
  index_list: &mut [u32],
  order_list: &[bool],
) {
  if priority_list[0].len() <= 1 {
    return;
  }

  let mid = priority_list[0].len() / 2;
  let mut left_priority_list = vec![];
  let mut right_priority_list = vec![];
  for key in priority_list.iter_mut() {
    let (left, right) = key.split_at_mut(mid);
    left_priority_list.push(left);
    right_priority_list.push(right);
  }

  let mut left_index_list = index_list[0..mid].to_vec();
  let mut right_index_list = index_list[mid..index_list.len()].to_vec();

  join(
    || {
      _rayon_merge_sort_objects_universal(
        &mut left_priority_list,
        &mut left_index_list,
        order_list,
      );
    },
    || {
      _rayon_merge_sort_objects_universal(
        &mut right_priority_list,
        &mut right_index_list,
        order_list,
      );
    },
  );

  let left_priority_list: Vec<Vec<f64>> = left_priority_list
    .iter()
    .map(|x| x.to_vec())
    .collect::<Vec<_>>();

  let right_priority_list: Vec<Vec<f64>> = right_priority_list
    .iter()
    .map(|x| x.to_vec())
    .collect::<Vec<_>>();

  merge_objects(
    priority_list,
    index_list,
    left_priority_list,
    right_priority_list,
    &left_index_list,
    &right_index_list,
    order_list,
  );
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test() {
    let mut priority0 = vec![3.0, 2.0, 1.0, 4.0, 5.0, 3.0];
    let mut priority_list = vec![priority0.as_mut_slice()];
    let mut index_list = vec![0, 1, 2, 3, 4, 5];
    let order_list = vec![true];

    _rayon_merge_sort_objects_universal(priority_list.as_mut_slice(), &mut index_list, &order_list);

    assert_eq!(priority_list[0], vec![1.0, 2.0, 3.0, 3.0, 4.0, 5.0]);
    assert_eq!(index_list, vec![2, 1, 0, 5, 3, 4]);

    let mut priority0 = vec![7.0, 3.0, -7.0, -10.0, -14.0, -7.0];
    let mut priority_list = vec![priority0.as_mut_slice()];
    let mut index_list = vec![0, 1, 2, 3, 4, 5];
    let order_list = vec![true];

    _rayon_merge_sort_objects_universal(priority_list.as_mut_slice(), &mut index_list, &order_list);

    assert_eq!(priority_list[0], vec![-14.0, -10.0, -7.0, -7.0, 3.0, 7.0]);
    assert_eq!(index_list, vec![4, 3, 2, 5, 1, 0]);
  }
}
