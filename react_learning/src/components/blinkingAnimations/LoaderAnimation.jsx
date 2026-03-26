import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import LoaderChild from "./LoaderChild";

function LoaderAnimation() {
  const [increment, setIncrement] = useState(0);

  const [timer, setTimer] = useState(10);
  //   useEffect(() => {
  //     let intervalId = setInterval(() => {
  //       setIncrement((prev) => (prev + 1) % arr.length);

  //       setTimer((prev) => (prev <= 0 ? 10 : prev - 1));
  //     }, 500);

  //     return () => clearInterval(intervalId);
  //   }, []);

  // useEffect(() => {
  //   setIncrement((prev) => prev + 1);
  //   console.log(increment);
  // }, []);
  const [items, setItems] = useState([
    { price: 100 },
    { price: 200 },
    { price: 300 },
    { price: 400 },
    { price: 500 },
  ]);

  function totalCost({ items }) {
    // let total = useMemo(() => {
    //   console.log("calculating ...")
    //   return items.reduce((acc, item) => acc + item.price, 0);
    // }, [items]);
    let total = items.reduce((acc, item) => acc + item.price, 0);
    console.log("calculating ...");

    return <p>total sum : {total}</p>;
  }

  // const passToChild = useCallback(() => {
  //   console.log("call back function hass been run ..");
  // }, []);
  const passToChild = () => {
    console.log("call back function hass been run ..");
  };

  return (
    <div>
      {/* {increment % 2 === 0 ? "loading.." : "loading...."}{" "}
      {timer > 0 ? timer : "times up"} */}
      <div
        style={{
          border: "1px solid white",
          backgroundColor: "black",
          margin: "1rem",
          padding: " 1rem",
        }}
      >
        <h1>Parent box</h1>
        <button
          onClick={() => setIncrement((prev) => prev + 1)}
          style={{ width: "20rem" }}
        >
          increase Count : {increment}
        </button>
        {totalCost({ items })}
        <button
          onClick={() => setTimer((prev) => prev + 1)}
          style={{ width: "20rem" }}
        >
          Update Child
        </button>
      </div>
      <div
        style={{
          border: "1px solid white",
          backgroundColor: "gray",
          margin: "1rem",
          padding: " 1rem",
        }}
      >
        <h1>Child Box</h1>
        <LoaderChild timer={timer} handleClick={passToChild}/>
      </div>
    </div>
  );
}

export default LoaderAnimation;
