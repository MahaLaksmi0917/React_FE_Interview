// import React from "react";

// const ITEM_HEIGHT = 30;
// function Virtualization({ items, height = 300 }) {
//   if (!items?.length) return <h1>pls provide items</h1>;
//   const containerRef = React.useRef(null);
//   const [scrollTop, setScrollTop] = React.useState(0);

//   const totalHeight = items.length * ITEM_HEIGHT;

//   const visibleCount = Math.ceil(height / ITEM_HEIGHT) + 2;
//   const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
//   const endIndex = Math.min(startIndex + visibleCount, items.length);
//   const visibleItems = items.slice(startIndex, endIndex);

//   const handleScroll = (e) => {
//     console.log(e.target.scrollTop);
//     setScrollTop(e.target.scrollTop);
//   };

//   return (
//     <div
//       ref={containerRef}
//       onScroll={handleScroll}
//       style={{
//         height,
//         overflowY: "auto",
//         border: "1px solid gray",
//         position: "relative",
//         width: "300px",
//       }}
//     >
//       {/* Fake spacer for full height and to show the scorll bar height for letting the user know that there are many more items in the list .. */}
//       <div style={{ height: totalHeight, position: "relative" }}>
//         {visibleItems.map((item, index) => {
//           const actualIndex = startIndex + index;
//           const top = actualIndex * ITEM_HEIGHT;

//           return (
//             <div
//               key={actualIndex}
//               style={{
//                 position: "absolute",
//                 top,
//                 height: ITEM_HEIGHT,
//                 left: 0,
//                 right: 0,
//                 background: actualIndex % 2 === 0 ? "#fafafa" : "#eee",
//                 display: "flex",
//                 alignItems: "center",
//                 paddingLeft: "12px",
//                 borderBottom: "1px solid #ccc",
//                 color: "#000000",
//               }}
//             >
//               {item}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Virtualization;

import React, { useEffect, useRef, useState } from "react";

const ITEM_HEIGHT = 35;
const DROPDOWN_HEIGHT = 220;

function VirtualizedDropdown() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);

  const [scrollTop, setScrollTop] = useState(0);

  const containerRef = useRef(null);

  // 🎲 Random data
  const names = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun",
    "Sai", "Reyansh", "Krishna", "Ishaan", "Kabir",
    "Ananya", "Diya", "Saanvi", "Aadhya", "Riya"
  ];

  const getRandomItem = (index) => {
    const name = names[Math.floor(Math.random() * names.length)];
    return `${name} #${index}`;
  };

  // 🔌 Fake API
  const fetchData = async (pageNumber) => {
    if (loading) return;

    setLoading(true);

    await new Promise((res) => setTimeout(res, 600));

    const newData = Array.from({ length: 20 }, (_, i) =>
      getRandomItem((pageNumber - 1) * 20 + i + 1)
    );

    if (pageNumber >= 5) setHasMore(false);

    setItems((prev) => [...prev, ...newData]);
    setLoading(false);
  };

  // 📦 Load data
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // 📜 Scroll handler
  const handleScroll = (e) => {
    const el = e.target;
    setScrollTop(el.scrollTop);

    // 🔥 Infinite scroll trigger
    if (
      el.scrollTop + el.clientHeight >= el.scrollHeight - 10 &&
      !loading &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  };

  // 🧠 Virtualization logic
  const totalHeight = items.length * ITEM_HEIGHT;

  const visibleCount = Math.ceil(DROPDOWN_HEIGHT / ITEM_HEIGHT) + 2;

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);

  const endIndex = Math.min(
    startIndex + visibleCount,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div style={styles.wrapper}>
      {/* 🔽 Trigger */}
      <div style={styles.input} onClick={() => setOpen(!open)}>
        {open ? "Close ⬆" : "Select User ⬇"}
      </div>

      {/* 📦 Dropdown */}
      {open && (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          style={styles.dropdown}
        >
          {/* Fake full height */}
          <div style={{ height: totalHeight, position: "relative" }}>
            {visibleItems.map((item, index) => {
              const actualIndex = startIndex + index;
              const top = actualIndex * ITEM_HEIGHT;

              return (
                <div
                  key={actualIndex}
                  style={{
                    ...styles.item,
                    position: "absolute",
                    top,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {/* Loader */}
          {loading && (
            <div style={styles.loader}>Loading...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default VirtualizedDropdown;

// 🎨 Styles
const styles = {
  wrapper: {
    width: "260px",
    fontFamily: "sans-serif",
    position: "relative",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#171515",
  },
  dropdown: {
    position: "absolute",
    top: "110%",
    left: 0,
    right: 0,
    height: `${DROPDOWN_HEIGHT}px`,
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#171515",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  },
  item: {
    height: `${ITEM_HEIGHT}px`,
    padding: "8px",
    borderBottom: "1px solid #f0f0f0",
    display: "flex",
    alignItems: "center",
    background: "#171515",
  },
  loader: {
    padding: "10px",
    textAlign: "center",
    fontSize: "13px",
  },
};