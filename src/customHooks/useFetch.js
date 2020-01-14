import { useEffect, useContext } from "react";
import Context from "../context";
import { API_TOKEN } from "../normally_from_back";
import { UPDATE_MEASURES } from "../state/types";

export const useFetch = () => {
  const { dispatch, URL } = useContext(Context);

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

        const NAModule1_temp = [];
        const NAModule1_humidity = [];
        const NAModule1_pressure = [];
        const NAModule2_wind_strength = [];
        const NAModule2_gust_strength = [];
        const NAModule3_rain_24h = [];
        const NAModule3_rain_60min = [];
        const NAModule3_rain_live = [];

        let temperature;
        let humidity;
        let pressure;
        let wind_strength;
        let gust_strength;
        let rain_24h;
        let rain_60min;
        let rain_live;

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
            }
          }
        });
        temperature = Math.round(
          NAModule1_temp.reduce((acc, val) => acc + val) / NAModule1_temp.length
        );
        humidity = Math.round(
          NAModule1_humidity.reduce((acc, val) => acc + val) /
            NAModule1_humidity.length
        );
        pressure = Math.round(
          NAModule1_pressure.reduce((acc, val) => acc + val) /
            NAModule1_pressure.length
        );
        wind_strength = Math.round(
          NAModule2_wind_strength.reduce((acc, val) => acc + val) /
            NAModule2_wind_strength.length
        );
        gust_strength = Math.round(
          NAModule2_gust_strength.reduce((acc, val) => acc + val) /
            NAModule2_gust_strength.length
        );
        rain_24h = Math.round(
          NAModule3_rain_24h.reduce((acc, val) => acc + val) /
            NAModule3_rain_24h.length
        );
        rain_60min = Math.round(
          NAModule3_rain_60min.reduce((acc, val) => acc + val) /
            NAModule3_rain_60min.length
        );
        rain_live = Math.round(
          NAModule3_rain_live.reduce((acc, val) => acc + val) /
            NAModule3_rain_live.length
        );
        dispatch({
          type: UPDATE_MEASURES,
          temperature,
          humidity,
          pressure,
          wind_strength,
          gust_strength,
          rain_24h,
          rain_60min,
          rain_live
        });
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    fetchData();
  }, [URL]);
};
