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

const isSorted = (arr, asc = true) => {
  for (let i = 1; i < arr.length; i++) {
    if ((asc && arr[i - 1] > arr[i]) || (!asc && arr[i - 1] < arr[i])) {
      return false;
    }
  }
  return true;
};

module.exports = {
  getRandomIntArray,
  getRandomFloatArray,
  isSorted,
};
