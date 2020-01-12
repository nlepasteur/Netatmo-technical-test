import React from "react";
import styled from "styled-components";

const GridItem = styled.div`
  background-color: yellow;
  grid-area: data;
  padding: 0.5em;
`;

function Wind() {
  return (
    <GridItem>
      <h1>Wind component</h1>
    </GridItem>
  );
}

export default Wind;
