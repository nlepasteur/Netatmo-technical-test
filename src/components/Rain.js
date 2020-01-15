import React, { useContext } from "react";
import styled from "styled-components";
import { useFetch } from "../customHooks/useFetch";
import Context from "../context";

const GridItem = styled.div`
  background-color: yellow;
  grid-area: data;
  padding: 0.5em;
`;

function Rain() {
  const {
    state: { rain_60min, rain_24h, rain_live }
  } = useContext(Context);

  useFetch();

  return (
    <GridItem>
      <h1>Rain component</h1>
    </GridItem>
  );
}

export default Rain;
