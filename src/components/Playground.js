import React from 'react';
import ArrayVisualizer from './ArrayVisualizer'

const Playground = () => {





    return (

        <div>
 <div className="playground-container">
        <ArrayVisualizer></ArrayVisualizer>
           </div> 

           <div className='playground-controls'>
                <button>Generate New Array</button>
           </div>
        </div>
       
    );
}



export default Playground;