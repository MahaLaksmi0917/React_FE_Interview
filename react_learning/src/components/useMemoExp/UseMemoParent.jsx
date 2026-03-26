import React, { useMemo, useState } from "react";
import UseMemoChild from "./UseMemoChild";

function UseMemoParent() {
  const [increment, setIncrement] = useState(0);
  const [items, setItems] = useState([
    { price: 100 },
    { price: 200 },
    { price: 300 },
    { price: 400 },
    { price: 500 },
  ]);

  function total({ items }) {
    let sum = items.reduce((acc, current) => acc + current.price, 0);
    console.log("recalculating ...");
    return <p>{sum}</p>;
  }

  function total({ items }) {
    let sum = useMemo(() => {
      console.log("recalculating ...");
      return items.reduce((acc, current) => acc + current.price, 0);
    }, [items]);
    return <p>{sum}</p>;
  }

  return (
    <div>
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
        <h1>{total({ items })}</h1>
      </div>
      {/* <div
        style={{
          border: "1px solid white",
          backgroundColor: "gray",
          margin: "1rem",
          padding: " 1rem",
        }}
      >
        <h1>Child Box</h1>
        <UseMemoChild />
      </div> */}
      <button onClick={() => setItems((prev) => [...prev , {price : 600}])}>update items </button>
    </div>
  );
}

export default UseMemoParent;
