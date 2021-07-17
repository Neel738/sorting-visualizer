
function BubbleSort(array, want_array=false) {
    // Write your code here.
    let animations = [];

      for (let i  =0; i < array.length; i++) {
          for (let j=0; j < (array.length - i - 1); j++) {
            animations.push({"type" : "comparing", "payload": [j, j+1]})
              if (array[j] > array[j+1]) {
                  array = swap(array, j, j+1);
                  animations.push({"type" : "swap", "payload": [j, j+1]})
                  animations.push({"type" : "done-swap", "payload": [j, j+1]})
              } else {
                animations.push({"type" : "no-swap", "payload": [j, j+1]})
              }
          }
          animations.push({"type" : "done", "payload": [array.length-i-1, array.length-i-1]})
      }

      if (want_array) {
        return array
      }else {
        return animations;
      }
  
      
  }
  
  function swap(array, i , j) {
      
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  
      return array;
  
  }




  function testBubbleSort() {
    let trues = 0;
    let falses = 0;

    for (var i =0; i < 1000 ; i++) {

      let current_array = [];
      for (var j = 0; j < 100; j++) {
        current_array.push(getRandomNumberBetween(0, 1000));
      }

      let own_sorted = BubbleSort(current_array, true);
      let javascript_sorted = current_array.sort(function(a,b){return a-b})

      arraysEqual(own_sorted, javascript_sorted) ? trues = trues +1 : falses = falses + 1;



    }

    console.log(`trues: ${trues}, falses : ${falses}`)
  }





  // Copied from w3 schools: https://www.w3schools.com/jsref/jsref_random.asp
  function  getRandomNumberBetween(lower, upper) {
    var new_num = Math.floor(Math.random() * upper + lower);
    return new_num;
  }
  
  //https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  function  arraysEqual (a, b) {
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
export default BubbleSort;
