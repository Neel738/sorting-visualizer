
  // Copied from w3 schools: https://www.w3schools.com/jsref/jsref_random.asp
  const  getRandomNumberBetween = (lower, upper) => {
    var new_num = Math.floor(Math.random() * upper + lower);
    return new_num;
  }
  
  //https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  const  arraysEqual = (a, b) => {
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

  export default {getRandomNumberBetween, arraysEqual}
