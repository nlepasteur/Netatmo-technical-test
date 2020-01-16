import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faCloudShowersHeavy,
  faWind
} from "@fortawesome/free-solid-svg-icons";

const GridItem = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  align-items: stretch;
  grid-area: nav;
  border-radius: 25px;
  background-color: #e1e8ff;
  transition : border-radius 2s;

  @media (max-width: 930px) {
    border-radius: 0;
    border : none;
  }

  > .active {
    background-color : #8892b3
    color: #e1e8ff;
  }
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

  @media (max-width: 930px) {
    margin : 0;
    padding : 0;
  }
  `;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #8892b3;

  &:focus,
  &:hover,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:last-child {
    border: none;
  }
  border-right: 1px solid #f0f4ff;
`;

function WeatherNav() {
  return (
    <GridItem>
      <StyledLink to="/temperature" activeClassName="active">
        <Content>
          <div>
            <FontAwesomeIcon icon={faTemperatureHigh} />
          </div>
          <h3>Temperature</h3>
        </Content>
      </StyledLink>
      <StyledLink to="/rain" activeClassName="active">
        <Content>
          <div>
            <FontAwesomeIcon icon={faCloudShowersHeavy} />
          </div>
          <h3>Rain</h3>
        </Content>
      </StyledLink>
      <StyledLink to="/wind" activeClassName="active">
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
