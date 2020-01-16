import React from "react";
import styled from "styled-components";
import { useFetch } from "../customHooks/useFetch";

const GridItem = styled.div`
  grid-area: data;

  > div {
    text-align: center;
  }

  @media (max-width: 930px) {
    margin-top: 1em;
  }
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
  align-content: stretch;
  border-top: 1px solid #6a2ed2;
  background-color: #ffffff;
  > div {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #6a2ed2;
    border-left: 1px solid #6a2ed2;
  }

  > div:nth-child(3n) {
    border-right: 1px solid #6a2ed2;
  }
`;

function Measures(props) {
  useFetch();
  return (
    <GridItem>
      {props.error ? (
        <div>
          <h3>Something went wrong</h3>
        </div>
      ) : props.load ? (
        <div>
          <h3>Loading data...</h3>
        </div>
      ) : (
        <Table>
          <div>{props.measure1}</div>
          <div>{props.measure2}</div>
          <div>{props.measure3}</div>

          <div>
            {props.value1}
            {props.measure1 === "Temperature"
              ? "°C"
              : props.measure1 === "Wind strength" && "kph"}
          </div>
          <div>
            {props.value2}
            {props.measure2 === "Humidity"
              ? "%"
              : props.measure2 === "Gust strength" && "kph"}
          </div>
          <div>
            {props.value3}
            {props.measure3 === "Pressure" && "mbar"}
          </div>
        </Table>
      )}
    </GridItem>
  );
}

export default Measures;
