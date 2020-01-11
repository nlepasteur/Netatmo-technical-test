import React from "react";
import styled from "styled-components";

const GridItem = styled.div`
  background-color: green;
  grid-area: cities;
`;

function CitiesButtons({ updateCity }) {
  return (
    <GridItem>
      <button onClick={updateCity} name="paris">
        Paris
      </button>

      <button onClick={updateCity} name="new_york">
        New York
      </button>

      <button onClick={updateCity} name="berlin">
        Berlin
      </button>

      <button onClick={updateCity} name="bogota">
        Bogota
      </button>
    </GridItem>
  );
}

export default CitiesButtons;
