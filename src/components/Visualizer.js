import React, { useState, useEffect } from "react";

const Visualizer = () => {
  const [array, setArray] = useState([]);

  const generateArray = () => {
    let new_array = [];

    for (let i = 0 ; i < 150; i++) {
        new_array.push(getRandomNumberBetween(1, 400 ));
    }
   
    setArray(new_array)
  };

  return (
    <div className="container visualizer-container">


        
        <center>

        <div className="playground-controls">
        
        <button onClick={generateArray}>Generate New Array</button>
        <button>Sort</button>
      
    </div>
    <center>
    <div className="array-container">
        {array.map((val, indx) => (
          <div
            className={"array-value"}
            key={indx}
            style={{ height: `${val}px` }}
          ></div>
        ))}
      </div>
    </center>
     
      
      </center>
    </div>
  );
};

export default Visualizer;



// Copied from w3 schools: https://www.w3schools.com/jsref/jsref_random.asp
function getRandomNumberBetween(lower, upper) {
    var new_num = Math.floor(Math.random() * upper + lower);
  return new_num;
}