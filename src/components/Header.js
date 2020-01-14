import React from "react";

import styled from "styled-components";

const Head = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  padding: 1em;
  text-align: center;
  background-color: blue;
  color: #ffffff;
`;

function Header() {
  return (
    <Head>
      <h2>Netatmo weathermap widget</h2>
      <h3>Display weather datas from big cities in the world!</h3>
    </Head>
  );
}

export default Header;
