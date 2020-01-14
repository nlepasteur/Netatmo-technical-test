import { useEffect, useContext } from "react";
import Context from "../context";
import { API_TOKEN } from "../normally_from_back";

export const useFetch = url => {
  const { dispatch } = useContext(Context);

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

    dispatch({
      type: val === 0 ? "TEMPERATURE" : "HUMIDITY",
      measure: average
    });
  };

  const getPressure = fetched => {
    const reports = fetched.body.map(obj => {
      const measures = obj.measures;
      const [first, getPropNameToAccessRes] = Object.keys(measures);
      const res = measures[getPropNameToAccessRes].res;
      const [getPropNameToAccessReports] = Object.keys(res);
      const [targetValue] = res[getPropNameToAccessReports];
      return targetValue;
    });
    const total = reports.reduce((acc, val) => acc + val);
    const average = total / reports.length;
    dispatch({ type: "PRESSURE", measure: average });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(url, {
          headers: new Headers({
            method: "GET",
            Authorization: `Bearer ${API_TOKEN}`
          })
        });

        const json = await result.json();
        console.log("json : ", json);

        getMeasures(json, 0);
        getMeasures(json, 1);
        getPressure(json);
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    fetchData();
  }, [url]);
};
