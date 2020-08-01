import G_State from "@scythodemes/lightweightglobalstate";
import React from "react";
let { G_number } = G_State.now;
let Clear = () => {
  let reset = () => {
    //----------------------
    let newState = {};
    newState.G_number = () => {
      G_number.value = 0;
      return "reset_G_number";
    };
    G_State.changesTo(newState);
    /*
    You can use G_State's utility function changesTo
    to update a property. In this paradigm, you create
    a newState object and define the property you will 
    change as a function of newState. The
    function should be named the property it will
    change, and you should only change the global property
    that the function is meant to change.
    ---------------------- */
  };
  return <button onMouseDown={reset}>Clear</button>;
};
export default Clear;
