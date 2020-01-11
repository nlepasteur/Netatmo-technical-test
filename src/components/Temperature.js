import React, { useContext } from "react";
import Context from "../context";

function Temperature() {
  const {
    state: { load, error, temperature, humidity }
  } = useContext(Context);

  return (
    <div>
      <h1>
        <strong>Here is TEMPERATURE component</strong>
      </h1>
      <h2>Temperature</h2>

      {load ? "waiting for temperature" : error ? error : temperature}

      <h2>Humidity</h2>
      {load ? "waiting for humidity" : error ? error : humidity}
    </div>
  );
}

export default Temperature;
