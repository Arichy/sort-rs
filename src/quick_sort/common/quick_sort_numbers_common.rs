use napi::bindgen_prelude::Float64Array;
use napi_derive::napi;
use rayon::join;

use super::{
  partition::partition_common,
  traits::{IndexComparable, Sizable, Splitable, Swappable},
};

#[derive(Debug)]
pub struct NumbersStruct<'a> {
  list: &'a mut [f64],
  asc: bool,
}

impl<'a> Sizable for NumbersStruct<'a> {
  fn len(&self) -> usize {
    self.list.len()
  }
}

impl<'a, 'n> Splitable<'n> for NumbersStruct<'a> {
  type HalfOutput = &'n mut [f64];

  fn split_at_mut(&'n mut self, mid: usize) -> (Self::HalfOutput, Self::HalfOutput) {
    let (left_list, right_list) = self.list.split_at_mut(mid);
    let right_list = &mut right_list[1..];
    (left_list, right_list)
  }
}

impl<'a> IndexComparable for NumbersStruct<'a> {
  fn compare(&self, i: usize, j: usize) -> bool {
    if (self.asc && self.list[i] < self.list[j]) || (!self.asc && self.list[i] > self.list[j]) {
      return true;
    }

    return false;
  }

  fn shallow_compare(&self, i: usize, j: usize) -> bool {
    self.compare(i, j)
  }
}

impl<'a> Swappable for NumbersStruct<'a> {
  fn swap(&mut self, i: usize, j: usize) {
    self.list.swap(i, j);
  }
}

#[napi]
fn quick_sort_numbers_common(mut list: Float64Array, asc: bool, rayon: bool) {
  let numbers_structure = NumbersStruct {
    list: &mut list,
    asc,
  };

  if rayon {
    _rayon_quick_sort_numbers_common(numbers_structure);
  } else {
    _normal_quick_sort_numbers_common(numbers_structure)
  }
}

fn _rayon_quick_sort_numbers_common<'a, 'n>(mut structure: NumbersStruct<'a>) {
  if structure.len() <= 1 {
    return;
  }

  let mid = partition_common(&mut structure);
  let asc = structure.asc;

  let (mut left_list, mut right_list) = structure.split_at_mut(mid);

  let left_struct = NumbersStruct {
    list: &mut left_list,
    asc,
  };

  let right_struct = NumbersStruct {
    list: &mut right_list,
    asc,
  };

  join(
    || _normal_quick_sort_numbers_common(left_struct),
    || _normal_quick_sort_numbers_common(right_struct),
  );
}

fn _normal_quick_sort_numbers_common<'a, 'n>(mut structure: NumbersStruct<'a>) {
  if structure.len() <= 1 {
    return;
  }

  let mid = partition_common(&mut structure);
  let asc = structure.asc;

  let (mut left_list, mut right_list) = structure.split_at_mut(mid);

  let left_struct = NumbersStruct {
    list: &mut left_list,
    asc,
  };

  let right_struct = NumbersStruct {
    list: &mut right_list,
    asc,
  };

  _normal_quick_sort_numbers_common(left_struct);
  _normal_quick_sort_numbers_common(right_struct);
}
