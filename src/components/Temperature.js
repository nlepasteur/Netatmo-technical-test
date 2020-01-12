import React, { useContext } from "react";
import Context from "../context";
import styled from "styled-components";

const GridItem = styled.div`
  background-color: yellow;
  grid-area: data;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  > div:first-child {
    background-color: grey;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1em 2em;
`;

function Temperature() {
  const {
    state: { load, error, temperature, humidity }
  } = useContext(Context);

  return (
    <GridItem>
      {error ? (
        <div>Something went wrong</div>
      ) : load ? (
        <div>Loading data...</div>
      ) : (
        <Table>
          <Row>
            <div>Temperature</div>
            <div>Humidity</div>
            <div>Pressure</div>
          </Row>
          <Row>
            <div>{temperature}°</div>
            <div>{humidity}°</div>
            <div></div>
          </Row>
        </Table>
      )}
    </GridItem>
  );
}

export default Temperature;

// > div {
//   padding: 0.5em 1em;
//   border-top: 1px solid black;
//   border-right: 1px solid black;
// }

// > div:first-child {
//   border-left: 1px solid black;
// }

// > div:nth-child(4) {
//   border-left: 1px solid black;
// }

// >div: nth-last-child(-n + 3) {
//   border-bottom: 1px solid black;
// }
