import React, { useState, useEffect } from "react";
import BubbleSort from "../algorithms/BubbleSort";
const Visualizer = () => {
  const [array, setArray] = useState([]);
  const [currentSwap, setCurrentSwap] = useState([]);
  const [counter, setCounter] = useState(0);

  const generateArray = () => {
    let new_array = [];

    for (let i = 0; i < 100; i++) {
      new_array.push(getRandomNumberBetween(1, 400));
    }

    setArray(new_array);
  };

  const doSort = () => {
    let animations = BubbleSort(array);
    console.log(animations)

    let bars = document.getElementsByClassName("array-value");
    for (var i = 0; i < animations.length; i++) {
      
      let animation = animations[i];
      
  
        setTimeout(() => {
          if (animation["type"] == "swap") {

            let pair = animation['payload'];
            let first = bars[pair[0]];
            let second = bars[pair[1]];

          let temp = first.style.height;
          first.style.height = second.style.height;
          second.style.height = temp;
          }
          else if (animation["type"] == "done") {
            console.log(bars)
            console.log(animation['payload'])
            let target_bar_to_be_done =  bars[animation["payload"]]
            target_bar_to_be_done.classList.add('purple');
          }
          
        }, i)
       
       
    

     

    }
    // for (let i = 0; i < animations.length; i++) {
    //   let next_switch = animations[i];
    //   console.log(`switching ${next_switch[0]} and ${next_switch[1]}`);
    //   let bars = document.getElementsByClassName("array-value");

    //   setTimeout(() => {
    //     const [barOneIdx, barTwoIdx] = animations[i];
    //     const barOneStyle = bars[barOneIdx].style;
    //     const barTwoStyle = bars[barTwoIdx].style;
    //     let  temp = barOneStyle.height;

    //     barOneStyle.height = `${barTwoStyle.height}px`;
    //     barTwoStyle.height = `${temp}px`;

    //   }, i * 10);
    // }
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
    <div>
   
        {currentSwap}
        <div className="playground-controls">
          <button onClick={generateArray}>Generate New Array</button>
          <button onClick={doSort}>Sort</button>
        </div>
        <div className="array-container">
          {array.map((val, indx) => (
            <div
              className={"array-value"}
              key={indx}
              style={{ height: `${val}px` }}
            ></div>
          ))}
        </div>
    
    </div>
  );
};

export default Visualizer;

// Copied from w3 schools: https://www.w3schools.com/jsref/jsref_random.asp
function getRandomNumberBetween(lower, upper) {
  var new_num = Math.floor(Math.random() * upper + lower);
  return new_num;
}
