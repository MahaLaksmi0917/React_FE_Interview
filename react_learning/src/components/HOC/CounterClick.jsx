// import React, { useState } from "react";

// function CounterClick({ count, increment }) {
//   return <button onClick={increment}>Cliked {count} times</button>;
// }

// export default CounterClick;



import React from 'react'
import useCounter from '../../hooks/useCounter'

function CounterClick() {
  const {count , increament, reset} = useCounter({max : 5}); 
  return (
    <>
    <button onClick={increament}>cliked for {count} times </button>
    <button onClick={reset} >reset</button>
    </>
  )
}

export default CounterClick