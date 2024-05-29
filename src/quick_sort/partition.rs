fn median_of_three<T: PartialOrd + Send>(v: &mut [T], asc: bool) -> usize {
  let mid = v.len() / 2;
  if (asc && v[mid] < v[0]) || (!asc && v[mid] > v[0]) {
    v.swap(0, mid);
  }
  if (asc && v[v.len() - 1] < v[0]) || (!asc && v[v.len() - 1] > v[0]) {
    v.swap(0, v.len() - 1);
  }
  if (asc && v[mid] < v[v.len() - 1]) || (!asc && v[mid] > v[v.len() - 1]) {
    v.swap(mid, v.len() - 1);
  }
  v.len() - 1
}

pub fn partition<T: PartialOrd + Send>(v: &mut [T], asc: bool) -> usize {
  let pivot = median_of_three(v, asc);
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

fn median_of_three_for_list(
  priority_list: &mut [&mut [f64]],
  index_list: &mut [u32],
  asc: bool,
) -> usize {
  let mid = priority_list[0].len() / 2;
  let last_index = priority_list[0].len() - 1;
  if (asc && priority_list[0][mid] < priority_list[0][0])
    || (!asc && priority_list[0][mid] > priority_list[0][0])
  {
    for key in priority_list.iter_mut() {
      key.swap(0, mid);
    }
    index_list.swap(0, mid);
  }
  if (asc && priority_list[0][last_index] < priority_list[0][0])
    || (!asc && priority_list[0][last_index] > priority_list[0][0])
  {
    for key in priority_list.iter_mut() {
      key.swap(0, last_index);
    }
    index_list.swap(0, last_index);
  }
  if (asc && priority_list[0][mid] < priority_list[0][last_index])
    || (!asc && priority_list[0][mid] > priority_list[0][last_index])
  {
    for key in priority_list.iter_mut() {
      key.swap(mid, last_index);
    }
    index_list.swap(mid, last_index);
  }

  last_index
}

pub fn partition_objects_universal(
  priority_list: &mut [&mut [f64]],
  index_list: &mut [u32],
  order_list: &[bool],
) -> usize {
  let pivot = median_of_three_for_list(priority_list, index_list, order_list[0]);
  let mut i = 0;

  for j in 0..pivot {
    let mut level = 0;

    let mut swap = false;

    while level < priority_list.len() {
      let is_asc = order_list[level];
      if (is_asc && priority_list[level][j] < priority_list[level][pivot])
        || (!is_asc && priority_list[level][j] > priority_list[level][pivot])
      {
        swap = true;

        break;
      } else if priority_list[level][j] == priority_list[level][pivot] {
        // priority of current level is equal, compare next level
        level += 1;
        if level == priority_list.len() {
          // all levels are equal, compare index
          if index_list[j] < index_list[pivot] {
            swap = true;
          }

          break;
        }
      } else {
        break;
      }
    }

    if swap {
      for key in priority_list.iter_mut() {
        key.swap(i, j);
      }
      index_list.swap(i, j);

      i += 1;
    }
  }

  for key in priority_list.iter_mut() {
    key.swap(i, pivot);
  }
  index_list.swap(i, pivot);

  i
}

fn median_of_three_for_list_with_one_priority_key(
  priority_key: &mut [f64],
  index_list: &mut [u32],
  asc: bool,
) -> usize {
  let mid = priority_key.len() / 2;
  let last_index = priority_key.len() - 1;
  if (asc && priority_key[mid] < priority_key[0]) || (!asc && priority_key[mid] > priority_key[0]) {
    priority_key.swap(0, mid);
    index_list.swap(0, mid);
  }
  if (asc && priority_key[last_index] < priority_key[0])
    || (!asc && priority_key[last_index] > priority_key[0])
  {
    priority_key.swap(0, last_index);
    index_list.swap(0, last_index);
  }
  if (asc && priority_key[mid] < priority_key[last_index])
    || (!asc && priority_key[mid] > priority_key[last_index])
  {
    priority_key.swap(mid, last_index);
    index_list.swap(mid, last_index);
  }

  last_index
}

pub fn partition_objcts_with_one_priority_key(
  priority_key: &mut [f64],
  index_list: &mut [u32],
  asc: bool,
) -> usize {
  let pivot = median_of_three_for_list_with_one_priority_key(priority_key, index_list, asc);
  let mut i = 0;
  for j in 0..pivot {
    if (asc && priority_key[j] < priority_key[pivot])
      || (!asc && priority_key[j] > priority_key[pivot])
    {
      priority_key.swap(i, j);
      index_list.swap(i, j);
      i += 1;
    } else if priority_key[j] == priority_key[pivot] {
      if index_list[j] < index_list[pivot] {
        priority_key.swap(i, j);
        index_list.swap(i, j);
        i += 1;
      }
    }
  }
  priority_key.swap(i, pivot);
  index_list.swap(i, pivot);
  i
}

fn median_of_three_for_list_with_two_priority_keys(
  priority_key0: &mut [f64],
  priority_key1: &mut [f64],
  index_list: &mut [u32],
  asc0: bool,
) -> usize {
  let mid = priority_key0.len() / 2;
  let last_index = priority_key0.len() - 1;
  if (asc0 && priority_key0[mid] < priority_key0[0])
    || (!asc0 && priority_key0[mid] > priority_key0[0])
  {
    priority_key0.swap(0, mid);
    priority_key1.swap(0, mid);
    index_list.swap(0, mid);
  }
  if (asc0 && priority_key0[last_index] < priority_key0[0])
    || (!asc0 && priority_key0[last_index] > priority_key0[0])
  {
    priority_key0.swap(0, last_index);
    priority_key1.swap(0, last_index);
    index_list.swap(0, last_index);
  }
  if (asc0 && priority_key0[mid] < priority_key0[last_index])
    || (!asc0 && priority_key0[mid] > priority_key0[last_index])
  {
    priority_key0.swap(mid, last_index);
    priority_key1.swap(mid, last_index);
    index_list.swap(mid, last_index);
  }

  last_index
}

pub fn partition_objects_with_two_priority_keys(
  priority_key0: &mut [f64],
  priority_key1: &mut [f64],
  index_list: &mut [u32],
  asc0: bool,
  asc1: bool,
) -> usize {
  let pivot = median_of_three_for_list_with_two_priority_keys(
    priority_key0,
    priority_key1,
    index_list,
    asc0,
  );
  let mut i = 0;
  for j in 0..pivot {
    if (asc0 && priority_key0[j] < priority_key0[pivot])
      || (!asc0 && priority_key0[j] > priority_key0[pivot])
    {
      priority_key0.swap(i, j);
      priority_key1.swap(i, j);
      index_list.swap(i, j);
      i += 1;
    } else if priority_key0[j] == priority_key0[pivot] {
      if (asc1 && priority_key1[j] < priority_key1[pivot])
        || (!asc1 && priority_key1[j] > priority_key1[pivot])
      {
        priority_key0.swap(i, j);
        priority_key1.swap(i, j);
        index_list.swap(i, j);
        i += 1;
      } else if priority_key1[j] == priority_key1[pivot] {
        if index_list[j] < index_list[pivot] {
          priority_key0.swap(i, j);
          priority_key1.swap(i, j);
          index_list.swap(i, j);
          i += 1;
        }
      }
    }
  }
  priority_key0.swap(i, pivot);
  priority_key1.swap(i, pivot);
  index_list.swap(i, pivot);
  i
}
