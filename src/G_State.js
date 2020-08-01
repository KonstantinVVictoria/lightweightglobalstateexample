import G_State from "@scythodemes/lightweightglobalstate";
import State from "@scythodemes/lightweightglobalstate";
const state = { G_number: { value: 0 } };
/*Create the global state.
  Add the properties that multiple components 
  need access to. 
  
  Each property 
  must be an object with a value.
*/

state.decrement = (property) => {
  let newState = {};
  newState[property] = () => {
    state[property].value--;
    return "decremented_" + property;
  };
  G_State.changesTo(newState);
};
/*In this file you can create general functions
  that can be accessed from any component and can
  update any property.
*/
state.G_number.square = () => {
  let newState = {};
  newState.G_number = () => {
    state.G_number.value =
      (state.G_number.value + 3) * (state.G_number.value + 3);
    return "squared_g_number+3";
  };
  G_State.changesTo(newState);
};
/*You can even attach functions to global state's properties and call these functions on any component.
 */

export default state;
