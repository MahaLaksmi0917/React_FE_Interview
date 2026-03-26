import React, { useState, useRef } from "react";

const users = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
}));

const ITEM_HEIGHT = 60; // each item’s height (px)
const VISIBLE_COUNT = 5; // how many items fit in viewport
function Virtualization() {
  const containerRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);

  const totalHeight = users.length * ITEM_HEIGHT; // full list height
  const endIndex = Math.min(startIndex + VISIBLE_COUNT, users.length);

  // calculate visible items
  const visibleUsers = users.slice(startIndex, endIndex);

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const newStart = Math.floor(scrollTop / ITEM_HEIGHT);
    setStartIndex(newStart);
  };
  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: `${VISIBLE_COUNT * ITEM_HEIGHT}px`,
        overflowY: "auto",
        border: "2px solid #555",
        position: "relative",
      }}
    >
      {/* Virtual spacer div to simulate total height */}
      <div
        style={{
          height: `${totalHeight}px`,
          position: "relative",
          width: "100vw",
          border: "1px solid red",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: startIndex * ITEM_HEIGHT,
            left: 0,
            right: 0,
          }}
        >
          {visibleUsers.map((user) => (
            <div
              key={user.id}
              style={{
                height: `${ITEM_HEIGHT}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid #ddd",
                backgroundColor: user.id % 2 === 0 ? "#f7f7f7" : "#fff",
                color: "black",
              }}
            >
              asdf {user.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Virtualization;
