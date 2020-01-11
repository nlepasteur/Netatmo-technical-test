import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GridItem = styled.div`
  background-color: red;
  grid-area: nav;
`;

function WeatherNav() {
  return (
    <GridItem>
      <button>
        <Link to="/temperature">Temperature</Link>
      </button>
      <button>
        <Link to="/rain">Rain</Link>
      </button>
      <button>
        <Link to="/wind">Wind</Link>
      </button>
    </GridItem>
  );
}

export default WeatherNav;
