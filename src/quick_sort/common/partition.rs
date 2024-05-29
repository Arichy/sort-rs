use std::fmt::Debug;

use super::traits::{IndexComparable, Sizable, Splitable, Swappable};

fn median_of_three_common<
  'a,
  'b,
  'p,
  'n,
  T: Sizable + Splitable<'n> + IndexComparable + Swappable + Debug,
>(
  structure: &mut T,
) -> usize {
  let mid = structure.len() >> 1;
  let last_index = structure.len() - 1;

  if structure.shallow_compare(mid, 0) {
    structure.swap(mid, 0);
  }

  if structure.shallow_compare(last_index, 0) {
    structure.swap(last_index, 0);
  }

  if structure.shallow_compare(mid, last_index) {
    structure.swap(mid, last_index);
  }

  last_index
}

pub fn partition_common<'n, T: Sizable + Splitable<'n> + IndexComparable + Swappable + Debug>(
  structure: &mut T,
) -> usize {
  let pivot = median_of_three_common(structure);
  let mut i = 0;

  for j in 0..pivot {
    if structure.compare(j, pivot) {
      structure.swap(i, j);
      i += 1;
    }
  }
  structure.swap(i, pivot);

  i
}
