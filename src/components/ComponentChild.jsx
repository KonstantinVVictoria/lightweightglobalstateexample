import React from "react";
import State from "../State";
//Create a global state and store all of the global properties that will rerender the component when changed.
let state = {
  G_number: State.now.G_number,
  G_sequence: State.now.G_sequence,
};
//Write the functional component
const ComponentChild = () => {
  const increment = () => {
    //Create the new global state subset.
    let newState = {};

    /*Add functions that change a single global property with the name of the property that they modify to the new global state. 
    Other global properties can be used in the function but not modified. Local properties can be modified freely*/
    newState.G_number = () => {
      State.now.G_number--;
      //Return the name of the event that changes the global property.
      return "decrement_number";
    };
    newState.G_negate = () => {
      State.now.G_negate = true;
      return "negate_number";
    };
    //Call State.changesTo and pass the newState object as an argument.
    State.changesTo(newState);
  };

  return (
    <button onMouseDown={increment}>
      Decrement Counters:{State.now.G_number}
    </button> //Notice that global properties can be used anywhere in the file but only modified in a new state object.
  );
};

//Don't forget to call State.links in the export definition and pass the functional component and the local global state that you defined in the beginning as arguments to the function.
export default State.links(ComponentChild, state);
