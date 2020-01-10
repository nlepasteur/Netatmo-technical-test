import React, { useEffect, useReducer, useState } from "react";
import { localisation, API_TOKEN } from "../normally_from_back";

const URL = `https://api.netatmo.com/api/getpublicdata?lat_ne=${localisation.paris.lat_ne}&lon_ne=${localisation.paris.lon_ne}&lat_sw=${localisation.paris.lat_sw}&lon_sw=${localisation.paris.lon_sw}`;

function FetchTest() {
  const [city, setCity] = useState("paris");

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
  }, []);

  console.log(localisation);

  return <div>yoyo</div>;
}

export default FetchTest;
