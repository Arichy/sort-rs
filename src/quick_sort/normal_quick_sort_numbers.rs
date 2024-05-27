use napi::bindgen_prelude::Float64Array;
use napi_derive::napi;

use super::partition::partition;

#[napi]
fn normal_quick_sort_numbers(mut arr: Float64Array, asc: bool) {
  _normal_quick_sort_numbers(&mut arr, asc);
}

fn _normal_quick_sort_numbers(arr: &mut [f64], asc: bool) {
  if arr.len() <= 1 {
    return;
  }

  let mid = partition(arr, asc);
  let (lo, hi) = arr.split_at_mut(mid);
  let hi = &mut hi[1..];

  _normal_quick_sort_numbers(lo, asc);
  _normal_quick_sort_numbers(hi, asc);
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_static() {
    let mut arr = vec![3.0, 2.0, 1.0, 4.0, 5.0, 3.0];
    _normal_quick_sort_numbers(&mut arr, true);

    assert_eq!(arr, vec![1.0, 2.0, 3.0, 3.0, 4.0, 5.0]);
  }

  #[test]
  fn test_large_sorted() {
    // create a large sorted array
    const COUNT: usize = 100000;

    let mut arr = vec![];
    for i in 0..COUNT {
      arr.push(i as f64);
    }
    _normal_quick_sort_numbers(&mut arr, false);

    assert_eq!(
      arr,
      (0..COUNT).rev().map(|x| x as f64).collect::<Vec<f64>>()
    );

    let mut arr = vec![];
    for i in 0..COUNT {
      arr.push(i as f64);
    }
    _normal_quick_sort_numbers(&mut arr, true);

    assert_eq!(arr, (0..COUNT).map(|x| x as f64).collect::<Vec<f64>>());

    let mut arr = vec![];
    for i in 0..COUNT {
      arr.push(i as f64);
    }
    arr.reverse();
    _normal_quick_sort_numbers(&mut arr, false);
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

    _normal_quick_sort_numbers(&mut arr, true);

    for i in 1..COUNT {
      assert!(arr[i - 1] <= arr[i]);
    }
  }
}
