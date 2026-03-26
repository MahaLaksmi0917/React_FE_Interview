import React, { useState } from "react";

function HoverCounter({ count, increment }) {
  return <h1 onMouseOver={increment}>hovered {count} times</h1>;
}

export default HoverCounter;
