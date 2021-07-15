import React, { useState, useEffect } from "react";

const ArrayVisualizer = () => {
  const [array, setArray] = useState([]);
 


  const generateArray = () => {
    let new_array = [];

    for (let i = 0 ; i < 50; i++) {
        new_array.push(getRandomNumberBetween(5, 200));
    }
   

    setArray(new_array);
  };

  

  return (
    <div className="array-container">
      <div className="playground-controls">
        <button onClick={generateArray}>Generate New Array</button>
      </div>

      <div className="array-content">
        
        {array.map((val, indx) => (
          <div className={'array-value'} key={indx} style={{height: `${val}px`}}></div>
        ))}
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
