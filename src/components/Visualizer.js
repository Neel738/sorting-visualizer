import React, { useState, useEffect } from "react";
import styles from "../styling";

import BubbleSort from "../algorithms/BubbleSort";
import QuickSort from "../algorithms/QuickSort";
import MergeSort from "../algorithms/MergeSort";

const Visualizer = () => {
  const [array, setArray] = useState([]);
  const DELAY = 10;
  const BARS = 100;
  const WIDTH = BARS < 30 ? 44 : 2;



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
          const [args1, args2, args3] = animation["payload"];
          switch (animation["type"]) {
            case "comparing":
              bars[args1].style.backgroundColor = styles["CURRENT"];
              bars[args2].style.backgroundColor = styles["CURRENT"];
             
              break;
            case "done_comparing":
              bars[args1].style.backgroundColor = styles["DEFAULT_COLOR"];
              bars[args2].style.backgroundColor = styles["DEFAULT_COLOR"];
             
              break;

            case "final" :
              bars[args1].style.backgroundColor = styles["DONE"];
              break;

            case "update_height":
             
              const barOneStyle = bars[args1].style;
              // const barTwoStyle = bars[args2].style;
            
              barOneStyle.height = `${args2}px`;

              
              // let temp = barOneStyle.height;
              // barOneStyle.height = barTwoStyle.height;
              // barTwoStyle.height = temp;
              break;
            
            

          
              
          }
        }, i * DELAY);
        
      }

      // const isColorChange = i % 3 !== 2;
      // if (isColorChange) {
      //   const [barOneIdx, barTwoIdx] = animations[i];
      //   const barOneStyle = bars[barOneIdx].style;
      //   const barTwoStyle = bars[barTwoIdx].style;
      //   const color = i % 3 === 0 ? styles['CURRENT'] : styles['DEFAULT_COLOR'];
      //   setTimeout(() => {
      //     barOneStyle.backgroundColor = color;
      //     barTwoStyle.backgroundColor = color;
      //   }, i * DELAY);
      // } else {
      //   setTimeout(() => {
      //     const [barOneIdx, newHeight] = animations[i];
      //     const barOneStyle = bars[barOneIdx].style;
      //     barOneStyle.height = `${newHeight}px`;
      //   }, i * DELAY);
      // }

   
    }

    //ENABLE IT AGAIN NEW ARRAY GENERATION
    setTimeout(() => {
      document.getElementById("generateArray").disabled = false;
    }, (animations.length + 1) * DELAY);
  };

  const visualizeBubbleSort = () => {
    document.getElementById("generateArray").disabled = true;
    let animations = BubbleSort(array);

    
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


  const visualizeQuickSort = () => {
    document.getElementById("generateArray").disabled = true;
    let animations = QuickSort(array);
    let bars = document.getElementsByClassName("array-value");
    let previous_pivot = undefined;

    for (var i = 0; i < animations.length; i++) {
      let animation = animations[i];
      
      if (animation['type'] != undefined) {
        const [args1, args2] = animation['payload'];

        setTimeout( () => {
          switch (animation['type']) {

            case "pivot":

              if (previous_pivot != undefined) {
                bars[previous_pivot].style.backgroundColor = styles['DEFAULT_COLOR']
              }
              bars[args1].style.backgroundColor = styles['PIVOT']
              previous_pivot = args1;
              break;
            case "swap":
              let temp = bars[args1].style.height;
              bars[args1].style.height = bars[args2].style.height;
              bars[args2].style.height = temp;

              break;
            case "current":
              bars[args1].style.backgroundColor = styles['CURRENT'];
              break;
            
            default:
              let color =styles["DEFAULT_COLOR"];
              bars[args1].style.backgroundColor = color;
             
          }
        }, i * DELAY)

        setTimeout(() => {
          document.getElementById("generateArray").disabled = false;
        }, (animations.length + 1) * DELAY);
      }
    }

  }

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
        <button onClick={visualizeQuickSort}>Quick Sort</button>
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
