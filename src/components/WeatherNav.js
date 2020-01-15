import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faCloudShowersHeavy,
  faWind
} from "@fortawesome/free-solid-svg-icons";

const GridItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  align-items: stretch;
  grid-area: nav;
  border-radius: 25px;
  border: 1px solid #a2a7ad;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1em;

  > div {
    margin-right: 0.5em;
  }import React from "react";
  import { Link } from "react-router-dom";
  import styled from "styled-components";
  `;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #a2a7ad;

  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:focus,
  &:hover {
    color: black;
  }

  border-right: 1px solid #a2a7ad;
`;

function WeatherNav() {
  return (
    <GridItem>
      <StyledLink to="/temperature">
        <Content>
          <div>
            <FontAwesomeIcon icon={faTemperatureHigh} />
          </div>
          <h3>Temperature</h3>
        </Content>
      </StyledLink>
      <StyledLink to="/rain">
        <Content>
          <div>
            <FontAwesomeIcon icon={faCloudShowersHeavy} />
          </div>
          <h3>Rain</h3>
        </Content>
      </StyledLink>
      <StyledLink to="/wind">
        <Content>
          <div>
            <FontAwesomeIcon icon={faWind} />
          </div>
          <h3>Wind</h3>
        </Content>
      </StyledLink>
    </GridItem>
  );
}

export default WeatherNav;
