import React, { useReducer, useState } from "react";
import Context from "./context";
import FetchTest from "./components/FetchTest";

import { initialState, reducer } from "./state/reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [city, setCity] = useState("paris");

  return (
    <Context.Provider value={{ state, dispatch, city, setCity }}>
      <div>
        <FetchTest />
      </div>
    </Context.Provider>
  );
}

export default App;
