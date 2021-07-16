import React, { useState, useEffect } from "react";
import BubbleSort from "../algorithms/BubbleSort";
const Visualizer = () => {
  const [array, setArray] = useState([]);
  const [currentSwap, setCurrentSwap] = useState([]);
  const [counter, setCounter] = useState(0);

  const generateArray = () => {
    let new_array = [];

    for (let i = 0; i < 150; i++) {
      new_array.push(getRandomNumberBetween(1, 400));
    }

    setArray(new_array);
  };

  const doSort = () => {
    let animations = BubbleSort(array);
    
    

    for (let i = 0; i < animations.length; i++) {
      
     

     

        let next_switch = animations[i];
        console.log(`switching ${next_switch[0]} and ${next_switch[1]}`)
        let bars = document.getElementsByClassName('array-value');


        setTimeout(() => {
        const [barOneIdx, height] = animations[i];
          const barOneStyle = bars[barOneIdx].style;
          barOneStyle.height = `${height}px`;

      }, i * 10)
      
    }
    
  };

  function swap(i, j) {
    
    let new_array = array;

    let temp = new_array[i];
    new_array[i] = new_array[j];
    new_array[j] = temp;

    setArray(new_array);
  }

  useEffect(generateArray, []);

  return (
    <div className="container visualizer-container">
      <center>
        {currentSwap}
        <div className="playground-controls">
          <button onClick={generateArray}>Generate New Array</button>
          <button onClick={doSort}>Sort</button>
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
