const { getRandomFloatArray, isSorted } = require('./utils');

const jsSort = arr => {
  const copy = [...arr];
  copy.sort((a, b) => b - a);
  return copy;
};

const typedArraySort = (arr: number[], asc = true) => {
  if (asc) {
    const input = new Float64Array(arr);
    input.sort();
    return Array.from(input);
  } else {
    const input = new Float64Array(arr);
    input.sort();
    return Array.from(input.reverse());
  }
};

const test = count => {
  const arr = getRandomFloatArray(count);
  {
    const copy = [...arr];
    console.time(`js sort ${count}`);
    const result = jsSort(copy);
    console.timeEnd(`js sort ${count}`);
    // console.log(isSorted(result, false));
  }

  {
    const copy = [...arr];
    console.time(`typed array sort ${count}`);
    const result = typedArraySort(copy);
    console.timeEnd(`typed array sort ${count}`);
    console.log(isSorted(result, false));
  }
  console.log();
};

test(1);
test(10);
test(20);
test(30);
test(40);
test(50);
test(100);
test(500);
test(1000);
test(5000);
test(10000);
test(20000);
test(50000);
test(100000);
