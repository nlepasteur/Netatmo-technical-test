import React from "react";

import styled from "styled-components";

const Head = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  margin-bottom: 1em;
  padding: 1em;
  border-radius: 15px;

  text-align: center;
  background-color: #f0f4ff;
  color: #8892b3;

  > h3 {
    color: #8892b3;
  }

  @media (max-width: 930px) {
    margin: 0;
    border-radius: 0;
  }
`;

function Header() {
  return (
    <Head>
      <h2>Netatmo weathermap widget</h2>
      <h3>Display weather datas from big cities in the world!</h3>
      <h2>last report : {new Date(Date.now()).toLocaleString("en-US")}</h2>
    </Head>
  );
}

export default Header;
