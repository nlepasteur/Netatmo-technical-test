import React, { useContext } from "react";
import { localisation } from "../normally_from_back";
import Context from "../context";
import { useFetch } from "../customHooks/useFetch";
import Temperature from "./Temperature";
import CitiesButtons from "./CitiesButtons";

function FetchTest() {
  const { state, city, setCity } = useContext(Context);

  const URL = `https://api.netatmo.com/api/getpublicdata?lat_ne=${localisation[city].lat_ne}&lon_ne=${localisation[city].lon_ne}&lat_sw=${localisation[city].lat_sw}&lon_sw=${localisation[city].lon_sw}`;
  useFetch(URL);

  const updateCity = e => {
    setCity(e.target.name);
    console.log("city updated");
  };

  console.log("state : ", state);

  return (
    <div>
      {/* <button onClick={updateCity} name="paris">
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
      </button> */}
      <CitiesButtons updateCity={updateCity} />
      <Temperature />
    </div>
  );
}

export default FetchTest;
