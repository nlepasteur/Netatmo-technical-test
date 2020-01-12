import React from "react";
import styled from "styled-components";

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: cities;
  justify-content: center;
  background-color: white;

  > .selected {
    background-color: grey;
  }

  > button {
    padding: 1em 0.5em;
    text-decoration: none;
    background-color: transparent;
    border: 0;
  }

  @media (min-width: 656px) {
    > button {
      border-bottom: 1px solid black;
    }

    > button:last-child {
      border-bottom: none;
    }
  }

  @media (max-width: 655px) {
    flex-direction: row;
  }
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
