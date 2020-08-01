const { default: state } = require("./Square Pyramadial/GlobalState");
import State from "./State";

let globalState={G_number:1, G_isTrue=false};

// export  default globalState
State.debug()
<App>
    state = {}
    state.globalLinks{G_number: 0}
    {constructor(props){
        super(props);
        State.linksTo(this)
    }}
  number: {globalState.G_number}
  <Counters >
    <Counter>
        {increment = ()=>{
            let newState = {}
            newState.G_number = () => {
                globalState.G_number++
            return "incremeting_G_number"
            } 
            State.changesTo(newState)

        }}
        {decrement = ()=>{
            let newState = {}
            newState.G_number = () => {
                globalState.G_number--
            return "incremeting_G_number"
            } 
            State.changesTo(newState)
        }}
      <React.Fragment>
        <button onMouseDown={increment}>+</button>
        <button onMouseDown={decrement}>-</button>
      </React.Fragment>
    </Counter>
  </Counters>
</App>;
