import React, { useCallback, useState } from "react";
import ChildCallBack from "./ChildCallBack";

function ParentCallback() {
  const [counter, setCounter] = useState(0);
  const handleCounter = () => {
    setCounter((prev) => prev + 1);
  };
  const handleClick = useCallback(() => {
    console.log("clicked ...");
  }, []);
  return (
    <div>
      <h1>Parent Call back {counter}</h1>
      <button onClick={handleCounter}>increse count : {counter}</button>
      <ChildCallBack handleClick={handleClick} />
    </div>
  );
}

export default ParentCallback;
