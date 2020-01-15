import React, { useContext } from "react";
import Context from "../context";
import styled from "styled-components";
import { useFetch } from "../customHooks/useFetch";

const GridItem = styled.div`
  grid-area: data;

  > div {
    text-align: center;
  }
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
  align-content: stretch;
  border-top: 1px solid #a2a7ad;
  > div {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #a2a7ad;
    border-left: 1px solid #a2a7ad;
  }
`;

function Temperature() {
  const {
    state: { load, error, temperature, humidity, pressure }
  } = useContext(Context);

  useFetch();

  return (
    <GridItem>
      {error ? (
        <div>
          <h3>Something went wrong</h3>
        </div>
      ) : load ? (
        <div>
          <h3>Loading data...</h3>
        </div>
      ) : (
        <Table>
          <div>Temperature</div>
          <div>Humidity</div>
          <div>Pressure</div>

          <div>{temperature}°</div>
          <div>{humidity}°</div>
          <div>{pressure}</div>
        </Table>
      )}
    </GridItem>
  );
}

export default Temperature;
