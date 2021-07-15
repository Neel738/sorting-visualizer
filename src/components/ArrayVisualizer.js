import React, {useState} from 'react'

const ArrayVisualizer = () => {
    
    const [array, setArray] = useState([]);

    const generateArray = (upperbound) => {

    }

    return <div className='array-container'>
        This is an array
      
    </div>
}
export default  ArrayVisualizer


// Copied from w3 schools: https://www.w3schools.com/jsref/jsref_random.asp
function getRandomNumberBetween(lower, upper) {
    Math.floor((Math.random() * upper) + lower);
}
