import React from "react";
import G_State from "@scythodemes/lightweightglobalstate";
const { G_number } = G_State.now;
const Counter = () => {
  const increment = () => {
    G_number.changesTo("incremented", G_number.value + 1);
    /*
    You can use G_number's embedded function (described in 
    G_State.js) to change a global property's value
    and rerender the components that need to be updated.
    I recommend this approach.
    */
  };
  return (
    <div>
      <button onMouseDown={increment}>+</button>
      <button onMouseDown={() => G_State.now.decrement("G_number")}>-</button>
      {/*
        Or you can use the general function written in G_State.jsx.
    */}
    </div>
  );
};

export default Counter;
