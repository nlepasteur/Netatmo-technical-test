import React, { useEffect, useReducer, useState } from "react";
import { localisation, API_TOKEN } from "../normally_from_back";

const initialState = {
  temperature: "",
  humidity: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TEMPERATURE":
      return {
        ...state,
        temperature: action.measure
      };
    case "HUMIDITY":
      return {
        ...state,
        humidity: action.measure
      };
    default:
      return state;
  }
};

function FetchTest() {
  const [city, setCity] = useState("paris");
  const [state, dispatch] = useReducer(reducer, initialState);

  const URL = `https://api.netatmo.com/api/getpublicdata?lat_ne=${localisation[city].lat_ne}&lon_ne=${localisation[city].lon_ne}&lat_sw=${localisation[city].lat_sw}&lon_sw=${localisation[city].lon_sw}`;

  const getMeasures = (fetched, val) => {
    const reports = fetched.body.map(obj => {
      const measures = obj.measures;
      const [getPropNameToAccessRes] = Object.keys(measures);
      const res = measures[getPropNameToAccessRes].res;
      const [getPropNameToAccessReports] = Object.keys(res);
      const targetValue = res[getPropNameToAccessReports][val];
      return targetValue;
    });
    const total = reports.reduce((acc, val) => acc + val);
    const average = total / reports.length;
    console.log(`${val === 0 ? "temperature" : "humidity"} : `, average);

    dispatch({
      type: val === 0 ? "TEMPERATURE" : "HUMIDITY",
      measure: average
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(URL, {
          headers: new Headers({
            method: "GET",
            Authorization: `Bearer ${API_TOKEN}`
          })
        });

        console.log("result : ", result);
        const json = await result.json();
        console.log("json : ", json);

        getMeasures(json, 0);
        getMeasures(json, 1);
      } catch (error) {
        console.log("pas pour cette fois");
      }
    };
    fetchData();
  }, [URL]);

  const updateCity = e => {
    setCity(e.target.name);
    console.log("city updated");
  };

  console.log("state : ", state);

  const { temperature, humidity } = state;

  return (
    <div>
      <button onClick={updateCity} name="paris">
        Paris
      </button>

      <button onClick={updateCity} name="new_york">
        New York
      </button>

      <button onClick={updateCity} name="berlin">
        Berlin
      </button>

      <button onClick={updateCity} name="bogota">
        Bogota
      </button>

      <div>
        <h2>Temperature</h2>
        {temperature}
        <h2>Humidity</h2>
        {humidity}
      </div>
    </div>
  );
}

export default FetchTest;
