import React from 'react'

function Child({ handleClick}) {
    console.log('Child Re rendered');
    
  return (
  <div>
      <h1>Child</h1>
      <button onClick={handleClick}>Log Count</button>
    </div>
  )
}

export default Child;
