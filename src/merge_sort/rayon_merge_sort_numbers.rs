use napi::bindgen_prelude::Float64Array;
use napi_derive::napi;
use rayon::join;

use super::merge::merge;

#[napi]
fn rayon_merge_sort_numbers(mut arr: Float64Array, asc: bool) {
  _rayon_merge_sort_numbers(&mut arr, asc);
}

fn _rayon_merge_sort_numbers(arr: &mut [f64], asc: bool) {
  if arr.len() <= 1 {
    return;
  }

  let mid = arr.len() / 2;
  let mut left = arr[0..mid].to_vec();
  let mut right = arr[mid..arr.len()].to_vec();
  join(
    || _rayon_merge_sort_numbers(&mut left, asc),
    || _rayon_merge_sort_numbers(&mut right, asc),
  );
  merge(arr, &left, &right, asc);
}

#[cfg(test)]
mod tests {
  use super::*;
  use rand;

  #[test]
  fn test_static() {
    let mut arr = vec![3.0, 2.0, 1.0, 4.0, 5.0, 3.0];
    _rayon_merge_sort_numbers(&mut arr, true);

    assert_eq!(arr, vec![1.0, 2.0, 3.0, 3.0, 4.0, 5.0]);
  }

  #[test]
  fn test_large_sorted() {
    // create a large sorted array
    let mut arr = vec![];
    const COUNT: usize = 5_000_000;
    for i in 0..COUNT {
      arr.push(i as f64);
    }
    _rayon_merge_sort_numbers(&mut arr, false);

    assert_eq!(
      arr,
      (0..COUNT).rev().map(|x| x as f64).collect::<Vec<f64>>()
    );
  }

  #[test]
  fn test_medium_random() {
    // create a small random array
    let mut arr = vec![];
    const COUNT: usize = 100_000;
    for _ in 0..COUNT {
      arr.push(rand::random::<f64>());
    }
    let mut arr2 = arr.clone();
    arr.sort_by(|a, b| a.partial_cmp(b).unwrap());
    _rayon_merge_sort_numbers(&mut arr2, true);

    assert_eq!(arr, arr2);
  }

  #[test]
  fn test_large_random() {
    // create a large random array
    let mut arr = vec![];
    const COUNT: usize = 500_000;
    for _ in 0..COUNT {
      arr.push(rand::random::<f64>());
    }
    let mut arr2 = arr.clone();
    arr.sort_by(|a, b| a.partial_cmp(b).unwrap());
    _rayon_merge_sort_numbers(&mut arr2, true);

    assert_eq!(arr, arr2);
  }
}
