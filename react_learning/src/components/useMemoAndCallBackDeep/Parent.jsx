import React, { useCallback, useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Clicked, current count:", count);
  };
//   console.log("Parent Re Rendered ..");

  return (
    <>
      <h1>Parent</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child handleClick={handleClick} />
    </>
  );
}

export default Parent;
