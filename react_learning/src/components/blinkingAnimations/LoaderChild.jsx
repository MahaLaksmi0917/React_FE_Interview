import React from "react";

function LoaderChild({ timer  , handleClick}) {
  console.log("loader Child has been rendered .... ");
  return (
    <>
      <div>LoaderChild {timer}</div>
      <button onClick={handleClick}>click to run parent function ...</button>
    </>
  );
}

export default LoaderChild;
