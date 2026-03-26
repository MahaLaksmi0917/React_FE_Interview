import React, { useEffect, useLayoutEffect } from "react";

function UseEffAndUseLay() {
  useEffect(() => {
    console.log("useEffect called");
  }, []);

  useLayoutEffect(() => {
    document.getElementById("parent").addEventListener("click", () => {
      console.log("parent Clicked ...");
    });
    document.getElementById("child").addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("child Clicked ...");
    });
    console.log("useLayoutEffect called");
  }, []);
  return (
    <>
      <div id="parent">
        <button id="child">Click me</button>
      </div>
    </>
  );
}

export default UseEffAndUseLay;