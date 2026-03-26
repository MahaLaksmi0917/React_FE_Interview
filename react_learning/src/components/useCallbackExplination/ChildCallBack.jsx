import React from "react";

function ChildCallBack({ handleClick }) {
    console.log("child has been called ")
  return (
    <div>
      <h1>Child Call back</h1>
      <button onClick={handleClick}>click to call handle click</button>
    </div>
  );
}

export default React.memo(ChildCallBack);
