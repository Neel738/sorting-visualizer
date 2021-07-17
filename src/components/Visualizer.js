import React, { useState, useEffect } from "react";
import styles from "../styling";

import BubbleSort from "../algorithms/BubbleSort";

import MergeSort from "../algorithms/MergeSort";

const Visualizer = () => {
  const [array, setArray] = useState([]);
  const DELAY = 1;
  const BARS = 10;
  const WIDTH = BARS < 20 ? 44 : 2;

  MergeSort([5, 4, 3, 2, 1, 0]);

  const resetBars = () => {
    let bars = document.getElementsByClassName("array-value");
    for (var i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = styles["DEFAULT_COLOR"];
    }
  };
  const generateArray = () => {
    resetBars();
    setArray([]);
    let new_array = [];

    for (let i = 0; i < BARS; i++) {
      new_array.push(getRandomNumberBetween(5, 400));
    }

    setArray(new_array);
  };

  const visualizeMergeSort = () => {
    //DISABLE NEW ARRAY GENERATION
    document.getElementById("generateArray").disabled = true;
    let animations = MergeSort(array);
    let bars = document.getElementsByClassName("array-value");

    for (var i = 0; i < animations.length; i++) {
      let animation = animations[i];

      if (animation["type"] != undefined) {
        setTimeout(() => {
          const [args1, args2] = animation["payload"];
          switch (animation["type"]) {
            case "comparing":
              bars[args1].style.backgroundColor = styles["CURRENT"];
              bars[args2].style.backgroundColor = styles["CURRENT"];
              break;
            case "done_comparing":
              bars[args1].style.backgroundColor = styles["DEFAULT_COLOR"];
              bars[args2].style.backgroundColor = styles["DEFAULT_COLOR"];
              break;

            case "update_height":
             
              const barOneStyle = bars[args1].style;
              barOneStyle.height = `${args2}px`;
              break;


            default:
              bars[args1] = styles["DEFAULT_COLOR"];
              bars[args2] = styles["DEFAULT_COLOR"];
              break;
              
          }
        }, i * DELAY);
      }

   
    }

    //ENABLE IT AGAIN NEW ARRAY GENERATION
    setTimeout(() => {
      document.getElementById("generateArray").disabled = false;
    }, (animations.length + 1) * DELAY);
  };

  const visualizeBubbleSort = (sort_type) => {
    document.getElementById("generateArray").disabled = true;
    let animations = BubbleSort(array);

    document.getElementById("generateArray").disabled = true;
    let bars = document.getElementsByClassName("array-value");
    for (var i = 0; i < animations.length; i++) {
      let animation = animations[i];
      let color = null;

      switch (animation["type"]) {
        case "swap":
          color = styles["SWAPPING"];
          break;

        case "comparing":
          color = styles["CURRENT"];
          break;

        case "done":
          color = styles["DONE"];
          break;

        default:
          color = styles["DEFAULT_COLOR"];
          break;
      }

      let pair = animation["payload"];

      let first = bars[pair[0]];
      let second = pair[1] != null ? bars[pair[1]] : null;

      // let previous = pair[0] > 0 ? bars[pair[0]-1] : bars[0];

      setTimeout(() => {
        switch (animation["type"]) {
          case "swap":
            let temp = first.style.height;
            first.style.height = second.style.height;
            second.style.height = temp;

            break;
        }

        first.style.backgroundColor = color;
        second.style.backgroundColor = color;
      }, i * DELAY);

      setTimeout(() => {
        document.getElementById("generateArray").disabled = false;
      }, (animations.length + 1) * DELAY);
    }
  };

  //This ensures an array is generated on page load;
  useEffect(generateArray, []);

  return (
    <div>
      <div className="playground-controls">
        <button id="generateArray" onClick={generateArray}>
          Generate New Array
        </button>
        <button onClick={visualizeBubbleSort}>Bubble Sort</button>
        <button onClick={visualizeMergeSort}>Merge Sort</button>
      </div>
      <div className="array-container">
        {array.map((val, indx) => (
          <div
            className={["array-value"]}
            key={indx}
            style={{ height: `${val}px `, width: `${WIDTH}px` }}
          >
            {WIDTH > 45 ? `${indx}, ${val}` : ""}
          </div>
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
