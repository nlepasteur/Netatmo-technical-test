import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import Context from "../context";
import { API_TOKEN } from "../normally_from_back";

const GridItem = styled.div`
  background-color: yellow;
  grid-area: data;
  padding: 0.5em;
`;

function Rain() {
  const { URL } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(URL, {
          headers: new Headers({
            method: "GET",
            Authorization: `Bearer ${API_TOKEN}`
          })
        });
        const json = await result.json();
        console.log("json from Rain component : ", json);

        const dispatchTreatedData = module => {
          const total = module.reduce((acc, val) => acc + val);
          const average = Math.round(total / module.length);
          console.log(average);
        };

        const NAModule1_temp = [];
        const NAModule1_humidity = [];
        const NAModule2_wind_strength = [];
        const NAModule2_gust_strength = [];
        const NAModule3_rain = [];

        json.body.forEach(obj => {
          for (let i = 0; i < obj.modules.length; i++) {
            const module = obj.modules[i];
            const type = obj.module_types[module];
            if (type === "NAModule1") {
              const subPath = obj.measures[module].res;
              const [subPathKey] = Object.keys(subPath); // destructure return array
              const subSubPath = subPath[subPathKey];
              const [temperature, humidity] = subSubPath;
              NAModule1_temp.push(temperature);
              NAModule1_humidity.push(humidity);
            } else if (type === "NAModule2") {
              const windData = obj.measures[module];
              const { gust_strength, wind_strength } = windData;
              // NAModule2_gust_strength.push(gust_strength);
              // NAModule2_wind_strength.push(wind_strength);
            } else if (type === "NAModule3") {
              const rainData = obj.measures[module];

              NAModule3_rain.push(rainData);
            }
          }
        });
        console.log("NAModule1_temperature : ", NAModule1_temp);
        console.log("NAModule1_humidity : ", NAModule1_humidity);
        console.log(" NAModule2_wind_strength : ", NAModule2_wind_strength);
        console.log(" NAModule2_gust_strength : ", NAModule2_gust_strength);

        console.log("NAModule3_rain : ", NAModule3_rain);

        // dispatch temperature
        dispatchTreatedData(NAModule1_temp);
        // dispatch humidity
        dispatchTreatedData(NAModule1_humidity);
        // dispatch wind
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [URL]);

  return (
    <GridItem>
      <h1>Rain component</h1>
    </GridItem>
  );
}

export default Rain;
