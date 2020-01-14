import { useEffect, useContext } from "react";
import Context from "../context";
import { API_TOKEN } from "../normally_from_back";

export const useFetch = () => {
  const { dispatch, URL } = useContext(Context);
  // const { URL } = useContext(Context);

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
        console.log("json from useFetch : ", json);

        const dispatchTreatedData = module => {
          //, type
          const total = module.reduce((acc, val) => acc + val);
          const average = Math.round(total / module.length);
          console.log(average);
          // dispatch({ type, measure: average.toUpperCase() });
        };

        const NAModule1_temp = [];
        const NAModule1_humidity = [];
        const NAModule1_pressure = [];
        const NAModule2_wind_strength = [];
        const NAModule2_gust_strength = [];
        const NAModule3_rain_24h = [];
        const NAModule3_rain_60min = [];
        const NAModule3_rain_live = [];

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
              // const { pressure, module } = obj.measures;
              const keyToPressure = Object.keys(obj.measures).find(
                item => item !== module
              );
              const subPathToPressure = obj.measures[keyToPressure].res;
              const subSubPathToPressure = Object.keys(subPathToPressure);
              const [pressure] = subPathToPressure[subSubPathToPressure];
              NAModule1_pressure.push(pressure);

              // const pressure = Object.keys(obj.measures[1])
            } else if (type === "NAModule2") {
              const windData = obj.measures[module];
              if (windData) {
                const { gust_strength, wind_strength } = windData;
                NAModule2_gust_strength.push(gust_strength);
                NAModule2_wind_strength.push(wind_strength);
              }
            } else if (type === "NAModule3") {
              const rainData = obj.measures[module];
              const { rain_24h, rain_60min, rain_live } = rainData;
              NAModule3_rain_24h.push(rain_24h);
              NAModule3_rain_60min.push(rain_60min);
              NAModule3_rain_live.push(rain_live);

              // NAModule3_rain.push(rainData);
            }
          }
        });
        console.log("NAModule1_temperature : ", NAModule1_temp);
        console.log("NAModule1_humidity : ", NAModule1_humidity);
        console.log(" NAModule2_wind_strength : ", NAModule2_wind_strength);
        console.log(" NAModule3_rain_24h : ", NAModule3_rain_24h);
        console.log(" NAModule3_rain_60min : ", NAModule3_rain_60min);
        console.log(" NAModule3_rain_live : ", NAModule3_rain_live);
        console.log("NAModule1_pressure : ", NAModule1_pressure);

        // dispatch temperature
        dispatchTreatedData(NAModule1_temp); // ajouter type pour dispatch en arg
        // dispatch humidity
        dispatchTreatedData(NAModule1_humidity); // ajouter type pour dispatch en arg
        // dispatch pressure
        dispatchTreatedData(NAModule1_pressure);
        // dispatch wind
        dispatchTreatedData(NAModule2_wind_strength); // ajouter type pour dispatch en arg
        dispatchTreatedData(NAModule2_gust_strength); // ajouter type pour dispatch en arg
        // dispatch rain
        dispatchTreatedData(NAModule3_rain_24h);
        dispatchTreatedData(NAModule3_rain_60min);
        dispatchTreatedData(NAModule3_rain_live);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [URL]);
};

// const getMeasures = (fetched, val) => {
//   const reports = fetched.body.map(obj => {
//     const measures = obj.measures;
//     const [getPropNameToAccessRes] = Object.keys(measures);
//     const res = measures[getPropNameToAccessRes].res;
//     const [getPropNameToAccessReports] = Object.keys(res);
//     const targetValue = res[getPropNameToAccessReports][val];
//     return targetValue;
//   });
//   const total = reports.reduce((acc, val) => acc + val);
//   const average = total / reports.length;

//   dispatch({
//     type: val === 0 ? "TEMPERATURE" : "HUMIDITY",
//     measure: average
//   });
// };

// const getPressure = fetched => {
//   const reports = fetched.body.map(obj => {
//     const measures = obj.measures;
//     const [first, getPropNameToAccessRes] = Object.keys(measures);
//     const res = measures[getPropNameToAccessRes].res;
//     const [getPropNameToAccessReports] = Object.keys(res);
//     const [targetValue] = res[getPropNameToAccessReports];
//     return targetValue;
//   });
//   const total = reports.reduce((acc, val) => acc + val);
//   const average = total / reports.length;
//   dispatch({ type: "PRESSURE", measure: average });
// };

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const result = await fetch(url, {
//         headers: new Headers({
//           method: "GET",
//           Authorization: `Bearer ${API_TOKEN}`
//         })
//       });

//       const json = await result.json();
//       console.log("json : ", json);

//       getMeasures(json, 0);
//       getMeasures(json, 1);
//       getPressure(json);
//     } catch (error) {
//       console.error(error);
//       dispatch({ type: "FETCH_ERROR" });
//     }
//   };
//   fetchData();
// }, [url]);
