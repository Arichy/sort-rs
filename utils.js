// some utils for testing
// the filename cannot contain `test`, otherwise it would be treated as a test file
function getRandomFloat(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomIntArray(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(getRandomInt(-100000, 100000));
  }
  return arr;
}

function getRandomFloatArray(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(getRandomFloat(-100000, 100000));
  }
  return arr;
}

function getSortedIntArray(count, asc = true) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i);
  }
  return asc ? arr : arr.reverse();
}

const isSorted = (arr, asc = true) => {
  for (let i = 1; i < arr.length; i++) {
    if ((asc && arr[i - 1] > arr[i]) || (!asc && arr[i - 1] < arr[i])) {
      return false;
    }
  }
  return true;
};

const sortObjectsWithOneKey = (arr, key, asc) => {
  return arr.sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    return asc ? aVal - bVal : bVal - aVal;
  });
};

const sortObjectsWithTwoKeys = (arr, key1, key2, asc1, asc2) => {
  return arr.sort((a, b) => {
    const aVal1 = a[key1];
    const bVal1 = b[key1];
    if (aVal1 === bVal1) {
      const aVal2 = a[key2];
      const bVal2 = b[key2];
      return asc2 ? aVal2 - bVal2 : bVal2 - aVal2;
    }
    return asc1 ? aVal1 - bVal1 : bVal1 - aVal1;
  });
};

const sortObjects = (arr, priorityList, orderList) => {
  const copied = [...arr];
  copied.sort((a, b) => {
    for (let i = 0; i < priorityList.length; i++) {
      const priority = priorityList[i];
      const order = orderList[i];
      const aVal = a[priority];
      const bVal = b[priority];

      if (aVal === bVal) {
        continue;
      }

      return order ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });
  return copied;
};

const isObjectsSorted = (arr, priorityList, orderList) => {
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < priorityList.length; j++) {
      const priority = priorityList[j];
      const order = orderList[j];
      const a = arr[i - 1][priority];
      const b = arr[i][priority];
      if ((order && a > b) || (!order && a < b)) {
        console.log(priority, order, arr[i - 1], arr[i]);
        return false;
      }
      if (a === b) {
        continue;
      } else {
        break;
      }
    }
  }
  return true;
};

module.exports = {
  sortObjectsWithOneKey,
  sortObjectsWithTwoKeys,
  getRandomFloat,
  getRandomInt,
  getRandomIntArray,
  getRandomFloatArray,
  isSorted,
  sortObjects,
  isObjectsSorted,
  getSortedIntArray,
};
