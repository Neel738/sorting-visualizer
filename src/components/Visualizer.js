import React, { useState, useEffect } from "react";
import BubbleSort from "../algorithms/BubbleSort";
const Visualizer = () => {
  const [array, setArray] = useState([]);
  const DELAY = 1;
  const BARS = 100;
  const WIDTH = 2 ;

  const generateArray = () => {
    setArray([]);
    let new_array = [];

    for (let i = 0; i < BARS; i++) {
      new_array.push(getRandomNumberBetween(1, 400));
    }

    setArray(new_array);
  };

  const doSort = () => {
    let animations = BubbleSort(array);


    let bars = document.getElementsByClassName("array-value");
    for (var i = 0; i < animations.length; i++) {
      let animation = animations[i];

      setTimeout(() => {
        if (animation["type"] === "swap") {
        

          let pair = animation["payload"];
          let first = bars[pair[0]];
          let second = bars[pair[1]];
          
         

          let temp = first.style.height;
          first.style.height = second.style.height;
          second.style.height = temp;


          first.classList = ["array-value"]
          second.classList =  ["array-value"]
         

        }
        else if (animation["type"] === "comparing") {
          let pair = animation["payload"];
          let first = bars[pair[0]];
          let second = bars[pair[1]];
          first.classList.add("green");
          second.classList.add("green");
        } else if (animation["type"] === "done") {
          let target_bar_to_be_done = bars[animation["payload"]];
          target_bar_to_be_done.classList.add("purple");
        } else if (animation["type"] === "no-swap") {
          let pair = animation["payload"];
          let first = bars[pair[0]];
          let second = bars[pair[1]];
          first.classList = ["array-value"]
          second.classList =  ["array-value"]
        }
      }, i * DELAY);
    }

  };

  

  //This ensures an array is generated on page load;
  useEffect(generateArray, []);

  return (
    <div>
      
      <div className="playground-controls">
        <button onClick={generateArray}>Generate New Array</button>
        <button onClick={doSort}>Sort</button>
      </div>
      <div className="array-container">
        {array.map((val, indx) => (
          <div
            className={["array-value"]}
            key={indx}
            style={{ height: `${val}px `, width: `${WIDTH}px`}}
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
