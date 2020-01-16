import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Context from "../context";
// below components
import CitiesButtons from "./CitiesButtons";
import WeatherNav from "./WeatherNav";
import Measures from "./Measures";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows : 1fr 2fr
  grid-template-areas:
    " cities nav nav nav"
    " cities data data data";
  grid-gap: 1em;
  background-color : #f0f4ff;
  ;

  @media (max-width: 930px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "nav"
      "cities"
      "data";
      grid-gap : 0;
      padding : 0;
  }
`;

function Wrapper() {
  // destructure state from global store
  const {
    setCity,
    state: {
      load,
      error,
      temperature,
      humidity,
      pressure,
      wind_strength,
      gust_strength,
      rain_24h,
      rain_60min,
      rain_live
    }
  } = useContext(Context);

  // depending on the target's name, update city state and add or remove "selected" class
  const updateCity = e => {
    setCity(e.target.name);
    const prev = document.querySelector(".selected");
    if (prev) {
      prev.classList.remove("selected");
    }
    const current = e.target;
    current.classList.add("selected");
  };

  return (
    <GridContainer>
      <WeatherNav />
      <CitiesButtons updateCity={updateCity} />
      {/* Switch allow to display component depending on path */}
      <Switch>
        {/* below pass state properties depending on the component */}
        <Route
          path="/temperature"
          render={props => (
            <Measures
              load={load}
              error={error}
              measure1="Temperature"
              value1={temperature}
              measure2="Humidity"
              value2={humidity}
              measure3="Pressure"
              value3={pressure}
            />
          )}
        />
        <Route
          path="/rain"
          render={props => (
            <Measures
              load={load}
              error={error}
              measure1="Rain live"
              value1={rain_live}
              measure2="Rain 60min"
              value2={rain_60min}
              measure3="Rain 24h"
              value3={rain_24h}
            />
          )}
        />
        <Route
          path="/wind"
          render={props => (
            <Measures
              load={load}
              error={error}
              measure1="Wind strength"
              value1={wind_strength}
              measure2="Gust strength"
              value2={gust_strength}
            />
          )}
        />
      </Switch>
    </GridContainer>
  );
}

export default Wrapper;
