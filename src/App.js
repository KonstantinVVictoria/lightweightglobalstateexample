import React, { Component } from "react";
import ComponentChild from "./components/ComponentChild";
import ComponentSister from "./components/ComponentSister";
import State from "./State";
//In this version, you can call State.debug() to store a list of events over time (under development). You can retrieve this list by printing document.events.
State.debug();
let globalState = { update_sequence: null }; //Create a global state and store all of the global properties that will rerender the component when changed.
class App extends Component {
  state = {};

  constructor(props) {
    super(props);

    State.links(this, globalState); //This will link the component to the global state. Components linked to the global state will be able to react to any changes made to the global state.
    //The link will rerender the component if it has
  }

  render() {
    return (
      <div>
        <h1>Square Pyramidal Numbers</h1>
        <button
          onMouseDown={() => {
            let newState = {}; //Instantiate a new state.

            //Add a single event which modifies a global state property to the new state.
            newState.G_number = () => {
              State.now.G_number = 0; //While other global properties can be read inside the function, they should not be rewritten. Local properties can be modified freely, however.
              return "clear_number"; //Return the purpose of that event.
            };
            //Create multiple events;
            newState.G_sequence = () => {
              State.now.G_sequence = "";
              return "clear_sequence";
            };
            newState.G_iterant = () => {
              State.now.G_iterant = 0;
              return "clear_iterant";
            };
            //                       //
            State.changesTo(newState); //Change the properties of the global state and update the components that are linked to the properties affected.
          }}
        >
          Clear
        </button>
        <button
          onMouseDown={() => {
            let newState = {};
            newState.G_number = () => {
              State.now.G_number++;
              return "increment_number";
            };

            State.changesTo(newState);
          }}
        >
          Increment Counters: {State.now.G_number}
        </button>
        <ComponentChild />
        <div>Sequence: {State.now.G_sequence}</div>
        <ComponentSister />
      </div>
    );
  }
}

export default App;
