pub fn merge<T: PartialOrd + Send + Copy>(arr: &mut [T], left: &[T], right: &[T], asc: bool) {
  let mut left_index = 0;
  let mut right_index = 0;
  let mut arr_index = 0;

  while left_index < left.len() && right_index < right.len() {
    if (asc && left[left_index] <= right[right_index])
      || (!asc && left[left_index] >= right[right_index])
    {
      arr[arr_index] = left[left_index];
      left_index += 1;
    } else {
      arr[arr_index] = right[right_index];
      right_index += 1;
    }
    arr_index += 1;
  }

  while left_index < left.len() {
    arr[arr_index] = left[left_index];
    left_index += 1;
    arr_index += 1;
  }

  while right_index < right.len() {
    arr[arr_index] = right[right_index];
    right_index += 1;
    arr_index += 1;
  }
}

pub fn merge_objects<T: PartialOrd + Send + Copy>(
  priority_list: &mut [&mut [T]],
  index_list: &mut [u32],
  // left_priority_list: &[&mut [T]],
  // right_priority_list: &[&mut [T]],
  left_priority_list: Vec<Vec<T>>,
  right_priority_list: Vec<Vec<T>>,
  left_index_list: &[u32],
  right_index_list: &[u32],
  order_list: &[bool],
) {
  let mut left_index = 0;
  let mut right_index = 0;
  let mut arr_index = 0;

  while left_index < left_priority_list[0].len() && right_index < right_priority_list[0].len() {
    let mut level = 0;
    while level < priority_list.len() {
      let is_asc = order_list[level];
      if (is_asc && left_priority_list[level][left_index] < right_priority_list[level][right_index])
        || (!is_asc
          && left_priority_list[level][left_index] > right_priority_list[level][right_index])
      {
        for (idx, key) in priority_list.iter_mut().enumerate() {
          key[arr_index] = left_priority_list[idx][left_index];
        }
        index_list[arr_index] = left_index_list[left_index];
        left_index += 1;
        arr_index += 1;
        break;
      } else if (is_asc
        && left_priority_list[level][left_index] > right_priority_list[level][right_index])
        || (!is_asc
          && left_priority_list[level][left_index] < right_priority_list[level][right_index])
      {
        for (idx, key) in priority_list.iter_mut().enumerate() {
          key[arr_index] = right_priority_list[idx][right_index];
        }
        index_list[arr_index] = right_index_list[right_index];
        right_index += 1;
        arr_index += 1;
        break;
      } else {
        // priority of current level is equal, compare next level
        level += 1;
        if level == priority_list.len() {
          // all levels are equal, compare index
          if left_index_list[left_index] < right_index_list[right_index] {
            for (idx, key) in priority_list.iter_mut().enumerate() {
              key[arr_index] = left_priority_list[idx][left_index];
            }
            index_list[arr_index] = left_index_list[left_index];
            left_index += 1;
            arr_index += 1;
          } else {
            for (idx, key) in priority_list.iter_mut().enumerate() {
              key[arr_index] = right_priority_list[idx][right_index];
            }
            index_list[arr_index] = right_index_list[right_index];
            right_index += 1;
            arr_index += 1;
          }
          break;
        }
      }
    }
  }

  while left_index < left_priority_list[0].len() {
    for (idx, key) in priority_list.iter_mut().enumerate() {
      key[arr_index] = left_priority_list[idx][left_index];
    }
    index_list[arr_index] = left_index_list[left_index];
    left_index += 1;
    arr_index += 1;
  }

  while right_index < right_priority_list[0].len() {
    for (idx, key) in priority_list.iter_mut().enumerate() {
      key[arr_index] = right_priority_list[idx][right_index];
    }
    index_list[arr_index] = right_index_list[right_index];
    right_index += 1;
    arr_index += 1;
  }
}
