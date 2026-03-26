import React, { useEffect, useState } from "react";

function SignalLighting() {
  const [intervalCount, setIntervalCount] = useState(0);
  let signalColors = ["red", "yellow", "green", "white"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIntervalCount((prev) => (prev + 1) % signalColors.length);
    }, 1000);

    return () => clearInterval(intervalId); // 🔴 cleanup is mandatory
  }, []);

  return (
    <div
      style={{
        border: "1px solid white",
        width: " 20vw",
        height: " 20vh",
        backgroundColor: `${signalColors[intervalCount] || "red"}`,
        transition: "all 0.4s ease",
      }}
    >
      signalLighting {intervalCount}
    </div>
  );
}

export default SignalLighting;
