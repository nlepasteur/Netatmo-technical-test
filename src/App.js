import React, { useReducer, useState } from "react";
import Context from "./context";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import styled from "styled-components";

import { localisation } from "./normally_from_back";

import { initialState, reducer } from "./state/reducer";

const ToPosition = styled.div`
  height: 80%;
  width: 80%;
  margin: auto;
  margin-top: 10%;

  @media (max-width: 930px) {
    height: 100%;
    width: 100%;
    margin: 0;
  }
`;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [city, setCity] = useState("paris");

  const URL = `https://api.netatmo.com/api/getpublicdata?lat_ne=${localisation[city].lat_ne}&lon_ne=${localisation[city].lon_ne}&lat_sw=${localisation[city].lat_sw}&lon_sw=${localisation[city].lon_sw}`;

  console.log("city : ", city);
  console.log("state : ", state);

  return (
    <Context.Provider value={{ state, dispatch, city, setCity, URL }}>
      <ToPosition>
        <Header />
        <Wrapper />
      </ToPosition>
    </Context.Provider>
  );
}

export default App;
