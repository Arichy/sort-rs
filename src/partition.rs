pub fn partition<T: PartialOrd + Send>(v: &mut [T], asc: bool) -> usize {
  let pivot = v.len() - 1;
  let mut i = 0;
  for j in 0..pivot {
    if (asc && v[j] <= v[pivot]) || (!asc && v[j] >= v[pivot]) {
      v.swap(i, j);
      i += 1;
    }
  }
  v.swap(i, pivot);
  i
}
