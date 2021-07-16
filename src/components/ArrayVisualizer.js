import React, { useState, useEffect } from "react";

const ArrayVisualizer = () => {
  const [array, setArray] = useState([]);
  const [counter , setCounter] = useState(0);
  const [arrayPresent, setArrayPresent] = useState([false])

  // useEffect(() => {
  //   if (arrayPresent) {
  //     if (array.length )
  //     setTimeout(() => {
  //       swap()
  //       setCounter(counter + 1)    
  //     }, 250)
  //   }
  // }, [counter, arrayPresent])


  const sort_next = () => {
    
    swap(0, 1);


  }

  

  const swap = (i ,j ) => {
    let new_array = array;
    let temp = new_array[0];
    
    new_array[0] = new_array[1];
    new_array[1] = temp;

    setArray(new_array);
    
  }

  

  const generateArray = () => {
    let new_array = [];

    for (let i = 0 ; i < 150; i++) {
        new_array.push(getRandomNumberBetween(1, 450
          ));
    }
   
    setCounter(0)
    setArray(new_array);
    setArrayPresent(true)
  };

  

  return (
    <div className="array-container">
     
     

      <div className="array-content">
        <center id='array-value-container'>
        {array.map((val, indx) => (
          <div className={'array-value'} key={indx} style={{height: `${val}px`}}></div>
        ))}
        </center>
       
        
       
      </div>

      <div className="playground-controls">
        <button onClick={generateArray}>Generate New Array</button>
        <button onClick={sort_next}>Sort</button>

      </div>
    </div>
  );
};
export default ArrayVisualizer;

// Copied from w3 schools: https://www.w3schools.com/jsref/jsref_random.asp
function getRandomNumberBetween(lower, upper) {
    var new_num = Math.floor(Math.random() * upper + lower);
  return new_num;
}

