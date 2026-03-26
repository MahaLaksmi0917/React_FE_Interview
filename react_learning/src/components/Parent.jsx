import React, { useEffect, useMemo, useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);
  const [initailValue, setInitialValue] = useState(
    "initial Value not changed..."
  );
  const [inputVal, setInputVal] = useState("");
  function increment() {
    setCount((count) => count + 1);
  }

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  // Create debounced function only once
  const debouncedLog = useMemo(() => {
    return debounce((val) => {
      console.log("API call with:", val);
    }, 300);
  }, []);

  useEffect(() => {
    console.log("Parent Re-rendering ...");
  }, []);
  
  const [items, setItems] = useState([
    { price: 100 },
    { price: 200 },
    { price: 300 },
    { price: 400 },
    { price: 500 },
  ]);

  function Cart({ items }) {
    const total = useMemo(() => {
      console.log("calculating the total ... ");
      return items.reduce((acc, item) => acc + item.price, 0);
    }, [items]);

    // console.log("calculating the total ... ");
    // const total = items.reduce((acc, item) => acc + item.price, 0);

    return <h3>Total: ₹{total}</h3>;
  };

  return (
    <>
      <h1>Parent : {count}</h1>{" "}
      {/* <button onClick={increment}>increment count</button>
      <button onClick={() => setInitialValue(Math.random())}>
        change value
      </button> */}
      {/* <Child value={initailValue} /> */}
      <input
        type="text"
        value={inputVal}
        onChange={(e) => {
          let value = e.target.value;
          setInputVal(value);
          debouncedLog(value); // Now it works
        }}
      />
      <li>input Value : {inputVal}</li>
      {Cart({ items })}
      <button onClick={() => setItems([...items, { price: 600 }])}>
        updateItem
      </button>
    </>
  );
}

export default Parent;
