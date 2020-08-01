import G_State from "@scythodemes/lightweightglobalstate";
import React from "react";
const { G_number } = G_State.now;
const Square = () => {
  return <button onMouseDown={G_number.square}>sqaure</button>;
  //You can call a global property's embedded functions
};

export default Square;
