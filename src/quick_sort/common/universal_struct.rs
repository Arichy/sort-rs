use super::traits::{IndexComparable, Sizable, Splitable, Swappable};

#[derive(Debug)]
pub(crate) struct UniversalStruct<'a, 'b, 'p> {
  pub(crate) priority_list: &'p mut [&'a mut [f64]],
  pub(crate) index_list: &'a mut [u32],
  pub(crate) order_list: &'b [bool],
}

impl<'a, 'b, 'p> Sizable for UniversalStruct<'a, 'b, 'p> {
  fn len(&self) -> usize {
    self.index_list.len()
  }
}

impl<'a, 'b, 'p, 'n> Splitable<'n> for UniversalStruct<'a, 'b, 'p> {
  type HalfOutput = (Vec<&'n mut [f64]>, &'n mut [u32]);

  fn split_at_mut(&'n mut self, mid: usize) -> (Self::HalfOutput, Self::HalfOutput) {
    let mut left_priority_list = vec![];
    let mut right_priority_list = vec![];

    for key in self.priority_list.iter_mut() {
      let (left, right) = key.split_at_mut(mid);
      let right = &mut right[1..];

      left_priority_list.push(left);
      right_priority_list.push(right);
    }

    let (left_index_list, right_index_list) = self.index_list.split_at_mut(mid);
    let right_index_list = &mut right_index_list[1..];

    (
      (left_priority_list, left_index_list),
      (right_priority_list, right_index_list),
    )
  }
}

impl<'a, 'b, 'p> IndexComparable for UniversalStruct<'a, 'b, 'p> {
  fn compare(&self, i: usize, j: usize) -> bool {
    let mut level = 0;
    let Self {
      priority_list,
      index_list,
      order_list,
    } = self;

    while level < priority_list.len() {
      let is_asc = order_list[level];
      if (is_asc && priority_list[level][i] < priority_list[level][j])
        || (!is_asc && priority_list[level][i] > priority_list[level][j])
      {
        return true;
      }

      if priority_list[level][i] == priority_list[level][j] {
        level += 1;
        if level == priority_list.len() {
          return index_list[i] < index_list[j];
        }
      } else {
        return false;
      }
    }

    panic!("Compare failed");
  }

  /// used in median_of_three
  fn shallow_compare(&self, i: usize, j: usize) -> bool {
    let asc = self.order_list[0];

    return (asc && self.priority_list[0][i] < self.priority_list[0][j])
      || (!asc && self.priority_list[0][i] > self.priority_list[0][j]);
  }
}

impl<'a, 'b, 'p> Swappable for UniversalStruct<'a, 'b, 'p> {
  fn swap(&mut self, i: usize, j: usize) -> () {
    for key in self.priority_list.iter_mut() {
      key.swap(i, j)
    }
    self.index_list.swap(i, j);
  }
}
