import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GridItem = styled.div`
  background-color: red;
  grid-area: nav;
  text-align: center;
`;

const Button = styled.button`
  padding: 1em 2em;
  text-decoration: none;
  background-color: transparent;
  border: 0;
`;

function WeatherNav() {
  return (
    <GridItem>
      <Link to="/temperature">
        <Button>Temperature</Button>
      </Link>

      <Link to="/rain">
        <Button>Rain</Button>
      </Link>

      <Link to="/wind">
        <Button>Wind</Button>
      </Link>
    </GridItem>
  );
}

export default WeatherNav;
