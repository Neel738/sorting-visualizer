import { getDefaultNormalizer } from "@testing-library/dom";

function MergeSort(array, want_array = false) {
  if (array.length <= 1) return array;
  let animations = [];
  const aux = array.slice();
  MergeSortUtil(array, aux, 0, array.length - 1, animations);
  // console.log(`final array: ${array}`)
  if (want_array) {
    return array;
  } else {
    return animations;
  }
}

function MergeSortUtil(array, aux, l, r, animations) {
  if (r === l) {
    // console.log(`${array[r]}`)
    return array;
  }
  const middle = Math.floor((l + r) / 2);
  //   console.log(`Slicing ${array[l]} to ${array[middle]}`)
  MergeSortUtil(aux, array, l, middle, animations);
  //   console.log(`Slicing ${array[middle+1]} to ${array[r]}`)
  MergeSortUtil(aux, array, middle + 1, r, animations);
  Merge(array, aux, l, middle, r, animations);
}

function Merge(array, aux, l, middle, r, animations) {
  // console.log(`Merging ${array[l]} to ${array[middle]} to ${array[r]}`)
  let k = l;
  let i = l;
  let j = middle + 1;
  while (i <= middle && j <= r) {
    animations.push([i, j]);

    animations.push({"type" : "comparing", "payload": [i, j]})
    animations.push({"type" : "done_comparing", "payload": [i, j]})
    

    animations.push([i, j]);

    if (aux[i] <= aux[j]) {
      animations.push([k, aux[i]]);

    animations.push({"type" : "update_height", "payload": [k, aux[i]]})
   
      array[k++] = aux[i++];
    } else {
      animations.push([k, aux[j]]);
      animations.push({"type" : "update_height", "payload": [k, aux[j]]})

      array[k++] = aux[j++];
    }
  }
  while (i <= middle) {
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    animations.push([k, aux[i]]);
    animations.push({"type" : "update_height", "payload": [k, aux[i]]})


    array[k++] = aux[i++];
  }
  while (j <= r) {
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, aux[j]]);

    animations.push({"type" : "update_height", "payload": [k, aux[j]]})


    array[k++] = aux[j++];
  }

  //   console.log(`array now ${array}`)
}

function testMergeSort() {
  let trues = 0;
  let falses = 0;

  for (var i = 0; i < 100; i++) {
    let current_array = [];
    for (var j = 0; j < 100; j++) {
      current_array.push(getRandomNumberBetween(0, 1000));
    }

    let own_sorted = MergeSort(current_array, true);
    let javascript_sorted = current_array.sort(function (a, b) {
      return a - b;
    });

    arraysEqual(own_sorted, javascript_sorted)
      ? (trues = trues + 1)
      : (falses = falses + 1);
  }

  console.log(`trues: ${trues}, falses : ${falses}`);
}

console.log(
  `${arraysEqual(
    [5, 4, 3, 2, 1, 0].sort(function (a, b) {
      return a - b;
    }),
    MergeSort([5, 4, 3, 2, 1, 0], true)
  )}`
);

// Copied from w3 schools: https://www.w3schools.com/jsref/jsref_random.asp
function getRandomNumberBetween(lower, upper) {
  var new_num = Math.floor(Math.random() * upper + lower);
  return new_num;
}

//https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export default MergeSort;
