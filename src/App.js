import React, { useReducer, useState } from "react";
import Context from "./context";
import Wrapper from "./components/Wrapper";

import { initialState, reducer } from "./state/reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [city, setCity] = useState("paris");

  console.log("state : ", state);

  return (
    <Context.Provider value={{ state, dispatch, city, setCity }}>
      <div>
        <Wrapper />
      </div>
    </Context.Provider>
  );
}

export default App;
