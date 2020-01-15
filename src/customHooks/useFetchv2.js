import { useEffect, useContext } from "react";
import Context from "../context";
import { UPDATE_MEASURES } from "../state/types";
import { api } from "../normally_from_back";

export const useFetch = () => {
  const { dispatch, URL } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get(URL);

        const json = await result.data;
        console.log("json from useFetch : ", json);

        const NAMs = {
          NAModule1_temp: {
            module_name: "NAModule1_temp",
            NAModule1_temp: [],
            measure_name: "temperature",
            temperature: ""
          },
          NAModule1_humidity: {
            module_name: "NAModule1_humidity",
            NAModule1_humidity: [],
            measure_name: "humidity",
            humidity: ""
          },
          NAModule1_pressure: {
            module_name: "NAModule1_pressure",
            NAModule1_pressure: [],
            measure_name: "pressure",
            pressure: ""
          },
          NAModule2_wind_strength: {
            module_name: "NAModule2_wind_strength",
            NAModule2_wind_strength: [],
            measure_name: "wind_strength",
            wind_strength: ""
          },
          NAModule2_gust_strength: {
            module_name: "NAModule2_gust_strength",
            NAModule2_gust_strength: [],
            measure_name: "gust_strength",
            gust_strength: ""
          },
          NAModule3_rain_24h: {
            module_name: "NAModule3_rain_24h",
            NAModule3_rain_24h: [],
            measure_name: "rain_24h",
            rain_24h: ""
          },
          NAModule3_rain_60min: {
            module_name: "NAModule3_rain_60min",
            NAModule3_rain_60min: [],
            measure_name: "rain_60min",
            rain_60min: ""
          },
          NAModule3_rain_live: {
            module_name: "NAModule3_rain_live",
            NAModule3_rain_live: [],
            measure_name: "rain_live",
            rain_live: ""
          }
        };

        json.body.forEach(obj => {
          for (let i = 0; i < obj.modules.length; i++) {
            const module = obj.modules[i];
            const type = obj.module_types[module];
            if (type === "NAModule1") {
              const subPath = obj.measures[module].res;
              const [subPathKey] = Object.keys(subPath);
              const subSubPath = subPath[subPathKey];
              const [temperature, humidity] = subSubPath;
              NAMs.NAModule1_temp.NAModule1_temp.push(temperature);
              NAMs.NAModule1_humidity.NAModule1_humidity.push(humidity);

              const keyToPressure = Object.keys(obj.measures).find(
                item => item !== module
              );
              const subPathToPressure = obj.measures[keyToPressure].res;
              const subSubPathToPressure = Object.keys(subPathToPressure);
              const [pressure] = subPathToPressure[subSubPathToPressure];

              NAMs.NAModule1_pressure.NAModule1_pressure.push(pressure);
            } else if (type === "NAModule2") {
              const windData = obj.measures[module];
              if (windData) {
                const { gust_strength, wind_strength } = windData;
                NAMs.NAModule2_wind_strength.NAModule2_wind_strength.push(
                  wind_strength
                );
                NAMs.NAModule2_gust_strength.NAModule2_gust_strength.push(
                  gust_strength
                );
              }
            } else if (type === "NAModule3") {
              const rainData = obj.measures[module];
              const { rain_24h, rain_60min, rain_live } = rainData;

              NAMs.NAModule3_rain_24h.NAModule3_rain_24h.push(rain_24h);
              NAMs.NAModule3_rain_60min.NAModule3_rain_60min.push(rain_60min);
              NAMs.NAModule3_rain_live.NAModule3_rain_live.push(rain_live);
            }
          }
        });

        const NAMsClone = Object.values(NAMs);
        for (let i = 0; i < NAMsClone.length; i++) {
          const module_name = NAMsClone[i].module_name;
          const measures = NAMsClone[i][module_name];

          if (measures.length > 0) {
            const roundReducedMeasures = Math.round(
              measures.reduce((acc, val) => acc + val) / measures.length
            );

            const measure_name = NAMsClone[i].measure_name;
            NAMsClone[i][measure_name] = roundReducedMeasures;
          }
          console.log("object clone de NAMs : ", NAMsClone);
        }

        dispatch({
          type: UPDATE_MEASURES,
          temperature: NAMsClone[0].temperature,
          humidity: NAMsClone[1].humidity,
          pressure: NAMsClone[2].pressure,
          wind_strength: NAMsClone[3].wind_strength,
          gust_strength: NAMsClone[4].gust_strength,
          rain_24h: NAMsClone[5].rain_24h,
          rain_60min: NAMsClone[6].rain_60min,
          rain_live: NAMsClone[7].rain_live
        });
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    fetchData();
  }, [URL]);
};
