import React, { useContext } from "react";
import Context from "../context";
import styled from "styled-components";

const GridItem = styled.div`
  background-color: yellow;
  grid-area: data;
`;

function Temperature() {
  const {
    state: { load, error, temperature, humidity }
  } = useContext(Context);

  return (
    <GridItem>
      <h1>temperature component</h1>

      <h2>Temperature</h2>

      {load ? "waiting for temperature" : error ? error : temperature}

      <h2>Humidity</h2>
      {load ? "waiting for humidity" : error ? error : humidity}
    </GridItem>
  );
}

export default Temperature;
