function QuickSort(array, want_array = false) {
    if (array.length <= 1) return array;
    let animations = [];


    QuickSortUtil(array,  0, array.length - 1, animations)
    // console.log(`final array: ${array}`)
    if (want_array) {
      return array;
    } else {
      return animations;
    }
}


function QuickSortUtil(array, lo, hi, animations ) {
    if (lo < hi) {
        let j = partition(array, lo , hi, animations);
        

        QuickSortUtil(array, lo, j-1,animations);
        QuickSortUtil(array, j+1, hi,animations);
        
        return array;

    }

}


function partition(array, lo , hi, animations) {
    let pivot = lo;
    animations.push({"type" : "pivot", "payload": [pivot]})
    let i = lo;
    let j = hi;

    

    while (i < j) {
        while (array[i] <= array[pivot]) {
            
            i++;
   
          
        }
        while (array[j] > array[pivot]) {
           
            j--;
            
           
        }
        if ( i <  j) {
          animations.push({"type" : "swap", "payload": [i, j]})
         
            swap(array, i , j);
            
        }
        

    }
    
    animations.push({"type" : "swap", "payload": [lo, j]})
   
    swap(array, lo , j);
    
    return j;


    

}

function swap(array, i , j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;


}




function testQuickSort() {
    let trues = 0;
    let falses = 0;
  
    for (var i = 0; i < 100000; i++) {
      let current_array = [];
      for (var j = 0; j < 100; j++) {
        current_array.push(getRandomNumberBetween(-1000, 1000));
      }
      let temp = current_array;

      let own_sorted = QuickSort(current_array.slice(), true);
      let javascript_sorted = current_array.slice().sort(function (a, b) {
        return a - b;
      });
 
      arraysEqual(own_sorted, javascript_sorted)
        ? (trues = trues + 1)
        : (falses = falses + 1);
    }
  
    console.log(`trues: ${trues}, falses : ${falses}`);
  }
  

  
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


  
export default QuickSort;

