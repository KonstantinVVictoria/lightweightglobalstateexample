import React from "react";
import State from "../State";
let state = {
  G_number: State.now.G_number,
  iterant: 0,
};
var Then = {};

const populate = () => {
  let counters = [];
  for (let i = 1; i <= State.now.G_number; i++) {
    State.now.G_iterant += i;
    State.now.G_negate = true;
    counters.push(
      <div key={i}>
        number:
        {State.now.G_number * i}
      </div>
    );
  }

  Then.update_sequence = () => {
    State.now.G_negate = false;
    State.now.G_sequence += State.now.G_iterant + ", ";
    return "update_sequence";
  };
  return counters;
};
const ComponentChild = () => {
  return populate();
};

export default State.links(ComponentChild, state, Then);
