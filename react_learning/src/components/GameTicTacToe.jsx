import React, { useState } from "react";

function GameTicTacToe() {
  let possibleOutCome = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let initialGameState = {
    row1: [
      { key: 0, value: "" },
      { key: 1, value: "" },
      { key: 2, value: "" },
    ],
    row2: [
      { key: 3, value: "" },
      { key: 4, value: "" },
      { key: 5, value: "" },
    ],
    row3: [
      { key: 6, value: "" },
      { key: 7, value: "" },
      { key: 8, value: "" },
    ],
  };

  const [isXTurn, setIsXturn] = useState(true);
  const [userInputs, setUserInputs] = useState(initialGameState);


    return null;
  };  const [winner, setWinner] = useState(null);

  const checkIfUserWon = (state) => {
    // flatten rows to a 0..8 array of values
    const flat = [...state.row1, ...state.row2, ...state.row3].map(
      (c) => c.value
    );
    // console.log(flat);

    for (const [a, b, c] of possibleOutCome) {
      //   console.log(a);

      if (flat[a] && flat[a] === flat[b] && flat[a] === flat[c]) {
        return flat[a];
      }
    }


  const updateUserInput = (cell, rowNum) => {
    // don't allow moves after we already have a winner
    if (winner) return;

    // prevent overwriting an already-filled cell
    if (cell?.value) return;

    // set the clicked cell to the current player (X or O) immutably
    setUserInputs((prev) => {
      const updatedRow = prev[rowNum].map((item) =>
        item.key === cell.key ? { ...item, value: isXTurn ? "X" : "O" } : item
      );
      const newState = { ...prev, [rowNum]: updatedRow };

      const win = checkIfUserWon(newState);
      if (win) {
        setWinner(win);
        setTimeout(() => {
          setUserInputs(initialGameState);
          setIsXturn(true);
          setWinner(null);
        }, 2000);
      }

      return newState;
    });

    // toggle turn
    setIsXturn((prev) => !prev);
  };

  return (
    <section>
      <div>
        {userInputs?.row1?.map((data, index) => {
          return (
            <button
              key={`${data.key}_${data?.value}`}
              onClick={() => updateUserInput(data, "row1")}
            >
              {data?.value || "?"}
            </button>
          );
        })}
      </div>{" "}
      <div>
        {userInputs?.row2?.map((data, index) => {
          return (
            <button
              key={`${data.key}_${data?.value}`}
              onClick={() => updateUserInput(data, "row2")}
            >
              {data?.value || "?"}
            </button>
          );
        })}
      </div>{" "}
      <div>
        {userInputs?.row3?.map((data, index) => {
          return (
            <button
              key={`${data.key}_${data?.value}`}
              onClick={() => updateUserInput(data, "row3")}
            >
              {data?.value || "?"}
            </button>
          );
        })}
      </div>
      <p>
        {`${isXTurn ? "X" : "O"} turn ...`} , {winner}
      </p>
    </section>
  );
}

export default GameTicTacToe;
