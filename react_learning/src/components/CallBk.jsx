import React, { useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
});

function CallBk() {
  const [count, setCount] = React.useState(0);
  // const handleClick = useCallback(() => {
  //   console.log("Clicked ... ");
  // }, []);

  const handleClick = () => {
    console.log("Clicked ... ");
  };

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>

      <Child onClick={handleClick} />
    </>
  );
}

export default CallBk;
