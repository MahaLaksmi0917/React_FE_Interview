import React, { useState } from "react";

function useCounter({ initial = 0, max } = {}) {  // if no object is passed think as empty object thats why = {}
  const [count, setCount] = useState(initial);

  const increament = () => {
    setCount((prev) => {
      if (max !== undefined && prev >= max) return prev;
      return prev + 1;
    });
  };

  const reset = () => {
    setCount(initial);
  };

  return { count, increament, reset };
}

export default useCounter;
