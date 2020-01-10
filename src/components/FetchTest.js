import React, { useEffect, useReducer, useState } from "react";
import { localisation, API_TOKEN } from "../normally_from_back";

function FetchTest() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          "https://api.netatmo.com/api/getpublicdata?lat_ne=48.86471476180278&lon_ne=2.373046875&lat_sw=48.83579746243092&lon_sw=2.3291015625",
          {
            headers: new Headers({
              method: "GET",
              Authorization: `Bearer ${API_TOKEN}`
            })
          }
        );

        console.log("result : ", result);
        const json = await result.json();
        console.log("json : ", json);

        const allTemps = json.body.map(obj => {
          const measures = obj.measures;
          const [getPropNameToAccessRes] = Object.keys(measures);
          const stepTwo = measures[getPropNameToAccessRes].res;
          const [getPropNameToAccessTemp] = Object.keys(stepTwo);
          const [temperature] = stepTwo[getPropNameToAccessTemp];
          return temperature;
        });

        console.log(allTemps);

        (function() {
          const reducer = (acc, val) => acc + val;
          const total = allTemps.reduce(reducer);
          console.log("function expression called : ", total);
          // const moyenne = 10 / 2;
          // console.log("ici la moyenne : ", moyenne);
        })();

        //////////////////////////////////////////////////////
        // const stepOne = json.body[9].measures;
        // console.log("variable property : ", stepOne);

        // const [getPropNameToAccessRes] = Object.keys(stepOne);
        // console.log("Specific number : ", [getPropNameToAccessRes]);

        // const stepTwo = stepOne[getPropNameToAccessRes].res;
        // console.log("step two start : ", stepTwo);

        // const [getPropNameToAccessTemp] = Object.keys(stepTwo);
        // console.log(
        //   "get property name to access temp : ",
        //   getPropNameToAccessTemp
        // );

        // const [temperature, humidity] = stepTwo[getPropNameToAccessTemp];
        // console.log("temperature : ", temperature, "humidity : ", humidity);
        ///////////////////////////////////////////
      } catch (error) {}
    };

    fetchData();
  }, []);

  console.log(localisation);

  return <div>yoyo</div>;
}

export default FetchTest;
