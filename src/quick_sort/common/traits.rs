pub(crate) trait Sizable {
  fn len(&self) -> usize;
}

pub(crate) trait Splitable<'new> {
  type HalfOutput;

  fn split_at_mut(&'new mut self, mid: usize) -> (Self::HalfOutput, Self::HalfOutput);
}

pub(crate) trait IndexComparable {
  /// Returns true if i's priority is lower than j's.
  fn compare(&self, i: usize, j: usize) -> bool;

  fn shallow_compare(&self, i: usize, j: usize) -> bool;
}

pub(crate) trait Swappable {
  fn swap(&mut self, i: usize, j: usize);
}
