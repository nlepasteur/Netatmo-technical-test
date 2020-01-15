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

const storeMeasures = (state, city) => {
  console.log(
    "function storeMeasures called (normally log after dispatch finish log). state : ",
    state
  );
  localStorage.setItem("WEATHER_STORAGE_KEY", JSON.stringify(state));
  localStorage.setItem("CITY_STORAGE_KEY", JSON.stringify(city));
};

let initialCity = "paris";

const readStoredMeasures = () => {
  console.log("readStoredMeasures as initialState called.");
  const storedMeasures = JSON.parse(
    localStorage.getItem("WEATHER_STORAGE_KEY")
  );
  const storedCity = JSON.parse(localStorage.getItem("CITY_STORAGE_KEY"));

  return storedMeasures && storedCity
    ? { storedMeasures, storedCity }
    : { initialState, initialCity };
};

function App() {
  const { storedMeasures, storedCity } = readStoredMeasures();
  const [state, dispatch] = useReducer(reducer, storedMeasures);
  const [city, setCity] = useState(storedCity);

  const URL = `https://api.netatmo.com/api/getpublicdata?lat_ne=${localisation[city].lat_ne}&lon_ne=${localisation[city].lon_ne}&lat_sw=${localisation[city].lat_sw}&lon_sw=${localisation[city].lon_sw}`;
  return (
    <Context.Provider
      value={{ state, dispatch, city, setCity, URL, storeMeasures }}
    >
      <ToPosition>
        <Header />
        <Wrapper />
      </ToPosition>
    </Context.Provider>
  );
}

export default App;
