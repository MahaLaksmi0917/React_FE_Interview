import React, { useEffect, useRef, useState } from "react";

function ProgressBar() {
  const [progressBarPercentage, setProgressBarPercentage] = useState(0); // this is for handling the progress bar timing..
  const stopProgressBar = useRef(false);
  const intervalId = useRef(null); // for storing the interval ID ...
  // why not use the intervalID in the let or const variable or any other state because when re- render happens while updating the
  // progressBarPercentage state this component actually re renders sooo... thats the reason we use useRef which has nothing to do
  // with the re renders .....

  function startProgressBar() {
    if (intervalId.current !== null) return;

    stopProgressBar.current = false;

    intervalId.current = setInterval(() => {
      if (stopProgressBar.current) return;

      setProgressBarPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(intervalId.current);
          intervalId.current = null; // ✅ important 
          return 100;
        }
        return prev + 1;
      });
    }, 100);
  }

  function _stopProgressBar() {
    stopProgressBar.current = true;
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null; // ✅ important
    }
  }

  function resumeProgressBar() {
    startProgressBar();
  }

  function resetProgressBar() {
    clearInterval(intervalId.current);
    stopProgressBar.current = false;
    intervalId.current = null;
    setProgressBarPercentage(0);
  }

  useEffect(() => {
    console.log("mounting progress bar ");

    return () => clearInterval(intervalId.current);
  }, []);

  return (
    <section>
      <h1>Progress Bar </h1>
      <div
        className="outerChild"
        style={{
          border: "1px solid white",
          width: "50vw",
          height: "5vw",
          borderRadius: "20rem",
          overflow: "hidden",
        }}
      >
        <div
          className="innerChild"
          style={{
            width: `${progressBarPercentage}%`,
            height: "100%",
            backgroundColor: "white",
            transition: "all 0.2s ease-in-out",
          }}
        ></div>
      </div>
      <div
        style={{
          // border: "1px solid white",
          width: "50vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={startProgressBar}>start</button>
        <button onClick={_stopProgressBar}>stop</button>
        <button onClick={resumeProgressBar}>resume</button>
        <button onClick={resetProgressBar}>reset</button>
      </div>
    </section>
  );
}

export default ProgressBar;
