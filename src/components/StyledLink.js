import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  color: #a2a7ad;

  &:focus,
  &:hover {
    color: black;
  }

  border-right: 1px solid #a2a7ad;
`;

export default props => <StyledLink {...props} />;
