import React, { useEffect } from "react";

function Child({ value }) {
  useEffect(() => {
    console.log("child Rerending ..");
  }, []);
  console.log("child rendering and  Re-rendering ...");

  return <p>Child : {value}</p>;
}

export default React.memo(Child);
