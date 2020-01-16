import React from "react";
import styled from "styled-components";

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: cities;
  justify-content: center;
  background-color: #e1e8ff;
  color: #8892b3;

  > h3 {
    padding: 1em 0.5em;
    background: #e1e8ff;
  }

  > .selected {
    background-color: #8892b3;
    color: #e1e8ff;
  }

  > button {
    padding: 1em 0.5em;
    text-decoration: none;
    background-color: #e1e8ff;
    color: #8892b3;
    border: 0;
  }

  @media (max-width: 930px) {
    flex-direction: column;
  }
`;

function CitiesButtons({ updateCity }) {
  return (
    <GridItem>
      <h3>City</h3>
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
