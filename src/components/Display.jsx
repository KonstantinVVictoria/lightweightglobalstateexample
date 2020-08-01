import React from "react";
import G_State from "@scythodemes/lightweightglobalstate";
const dependancies = G_State.link("G_number");
//For functional components, you define the dependancies outside of the function.
const Display = () => {
  return <p>{G_State.now.G_number.value + 3}</p>; // -- note that you can also call the G_number's value from the G_State object.
};
export default G_State.updates(Display, dependancies);
/*and you also call G_State's utility function updates with the
 arguments updates(comoponent, dependancies, afterEffects)
*/
