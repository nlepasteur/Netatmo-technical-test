import React from "react";
import styled from "styled-components";
import { useFetch } from "../customHooks/useFetch";

const GridItem = styled.div`
  background-color: yellow;
  grid-area: data;
  padding: 0.5em;
`;

function Rain() {
  useFetch();

  return (
    <GridItem>
      <h1>Rain component</h1>
    </GridItem>
  );
}

export default Rain;
