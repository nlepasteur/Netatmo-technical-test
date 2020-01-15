import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Context from "../context";
import Temperature from "./Temperature";
import Rain from "./Rain";
import Wind from "./Wind";
import CitiesButtons from "./CitiesButtons";
import WeatherNav from "./WeatherNav";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows : 1fr 2fr
  grid-template-areas:
    " cities nav nav nav"
    " cities data data data";
  grid-gap: 1em;
  padding : 1em;
  background-color : #6a2ed2
  ;
  border-radius : 15px;

  @media (max-width: 930px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "nav"
      "cities"
      "data";
      grid-gap : 0;
      padding : 0;
      background-color : #feb7bf;
  }
`;

function Wrapper() {
  const { setCity } = useContext(Context);

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
      <Switch>
        <Route path="/temperature" component={Temperature} />
        <Route path="/rain" component={Rain} />
        <Route path="/wind" component={Wind} />
      </Switch>
    </GridContainer>
  );
}

export default Wrapper;
