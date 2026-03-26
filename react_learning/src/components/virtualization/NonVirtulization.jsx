import React from "react";

const ITEM_HEIGHT = 30;
function Virtualization({ items }) {

  return (
    <div
      style={{
        height: items.length * ITEM_HEIGHT,
        overflowY: "auto",
        border: "1px solid gray",
        position: "relative",
        width: "300px",
      }}
    >
      {/* Fake spacer for full height and to show the scorll bar height for letting the user know that there are many more items in the list .. */}
      <div style={{ height: "500px"}}> 
        {items.map((item, index) => {
          const top = index * ITEM_HEIGHT;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top,
                height: ITEM_HEIGHT,
                left: 0,
                right: 0,
                background: index % 2 === 0 ? "#fafafa" : "#eee",
                display: "flex",
                alignItems: "center",
                paddingLeft: "12px",
                borderBottom: "1px solid #ccc",
                color: "#000000",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Virtualization;
