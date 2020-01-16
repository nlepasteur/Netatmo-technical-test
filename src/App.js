import React, { useReducer, useState } from "react";
import styled from "styled-components";
// below components
import Context from "./context";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
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

// below allow to anticipate page refresh, (keep data to the next render)
// 1) create key / value in the local storage, used after fetch to store new states
const storeMeasures = (state, city) => {
  localStorage.setItem("WEATHER_STORAGE_KEY", JSON.stringify(state));
  localStorage.setItem("CITY_STORAGE_KEY", JSON.stringify(city));
};

let initialCity = "paris";

// 2) read local storage, if asked data exists return it as initial value to pass it in reducer, else return hard coded initial value
const readStoredMeasures = () => {
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

  // this URL is updated dynamically, depending on city state, depending on this URL useFetch's useEffect are called
  const URL = `https://api.netatmo.com/api/getpublicdata?lat_ne=${localisation[city].lat_ne}&lon_ne=${localisation[city].lon_ne}&lat_sw=${localisation[city].lat_sw}&lon_sw=${localisation[city].lon_sw}`;
  return (
    // Context acts here as a global store to provide data through components, state is destructured inside components
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
