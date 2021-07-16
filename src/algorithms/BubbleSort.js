function BubbleSort(array) {
    // Write your code here.
    let animations = [];

      for (let i  =0; i < array.length; i++) {
          for (let j=0; j < (array.length - i - 1); j++) {
              if (array[j] > array[j+1]) {
                  array = swap(array, j, j+1);
                  animations.push({"type" : "swap", "payload": [j, j+1]})
              }
          }
          animations.push({"type" : "done", "payload": array.length-i-1})
      }
  
      return animations;
  }
  
  function swap(array, i , j) {
      
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  
      return array;
  
  }



export default BubbleSort;
