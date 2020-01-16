import { useEffect, useContext } from "react";
import Context from "../context";
import { UPDATE_MEASURES } from "../state/types";
import { api } from "../normally_from_back";

export const useFetch = () => {
  const { state, dispatch, URL, storeMeasures, city } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // use header created with axios
        const result = await api.get(URL);
        const json = await result.data;

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

        // below loop through returned data from api
        json.body.forEach(obj => {
          // iteration to browse each module of an obj
          for (let i = 0; i < obj.modules.length; i++) {
            // below retrieve module's mac address to access it
            // treat data differently depending on module's type which is determined inside module_types propertie, retrieved thanks to modules propertie
            const module = obj.modules[i];
            const type = obj.module_types[module];
            if (type === "NAModule1") {
              // below retrieve object keys to continue path
              const subPath = obj.measures[module].res;
              const [subPathKey] = Object.keys(subPath);
              const subSubPath = subPath[subPathKey];
              // below destructure result to push it inside an array treated later with roundMeasure function
              const [temperature, humidity] = subSubPath;
              NAModule1_temp.push(temperature);
              NAModule1_humidity.push(humidity);
              // below allow to retrieve pressure data, which hasn't the same type of path
              const keyToPressure = Object.keys(obj.measures).find(
                item => item !== module
              );
              const subPathToPressure = obj.measures[keyToPressure].res;
              const subSubPathToPressure = Object.keys(subPathToPressure);
              const [pressure] = subPathToPressure[subSubPathToPressure];
              NAModule1_pressure.push(pressure);
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

        // this function treat data to get an average, before dispatch in global store
        const roundMeasure = module => {
          // check if treated array has more than 1 item to prevent errors, was somethimes the case for Bogota
          if (module.length > 1) {
            return Math.round(
              module.reduce((acc, val) => acc + val) / module.length
            );
          } else return Math.round(module);
        };

        temperature = roundMeasure(NAModule1_temp);
        humidity = roundMeasure(NAModule1_humidity);
        pressure = roundMeasure(NAModule1_pressure);
        wind_strength = roundMeasure(NAModule2_wind_strength);
        gust_strength = roundMeasure(NAModule2_gust_strength);
        rain_24h = roundMeasure(NAModule3_rain_24h);
        rain_60min = roundMeasure(NAModule3_rain_60min);
        rain_live = roundMeasure(NAModule3_rain_live);

        // dispatch results from roundMeasure function, inside global store
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
        // catch "manages" rejected promises
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    fetchData();
    // no need to prevent unmount here
    // below URL as dependency to call useEffect each time the URL is changing
  }, [URL]);

  // below it is important to use "state" as a dependency to update local storage with last data
  // in case of no dependency, this useEffect would be called before above useEffect which has asynchronous tasks, stated data would be the old one
  useEffect(() => {
    storeMeasures(state, city);
  }, [state]);
};
