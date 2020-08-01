import React, { Component } from "react";
import Counter from "./components/Counter";
import Clear from "./components/Clear";
import Display from "./components/Display";
import Square from "./components/Square";
import G_State from "@scythodemes/lightweightglobalstate";

G_State.debug({ live: true });
/*Use the debug(...args) command to
 monitor the global state via console logs.
 */

var {
  G_number,
} = G_State.now; /*You can use desctructuring to grab properties from the present global state. */
class App extends Component {
  constructor(props) {
    super(props);
    //----------------------------
    this.state = { number: 0 };
    this.state.G_dependancies = G_State.link("G_number");
    //or this.state.G_dependancies = G_State.link("G_number", "G_secondNumber")
    //or this.state.G_dependancies = {G_number: null, G_secondNumber: null};
    G_State.updates(this);
    /*For a class component, add a G_dependancies
      object to its state and list the properties 
      that will rerender the component when changed.
      In this case everytime G_number is 
      changed by the Counter, Square, and Clear components, we need
      to render this app to show the updated G_number value.
    ----------------------------*/
  }
  render() {
    return (
      <div>
        number: {G_number.value} + 3 = {G_number.value + 3}
        {<Display />}
        <Counter />
        <Square />
        <Clear />
      </div>
    );
  }
}

export default App;
