import React, { useEffect, useReducer, useState } from "react";

const API_TOKEN = "5e1674428b2345000b592097|b6e820ccbc5b4dbc26982827c559ab47";

function Fetch() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          "https://api.netatmo.com/api/getpublicdata?lat_ne=48.86471476180278&lon_ne=2.373046875&lat_sw=48.83579746243092&lon_sw=2.3291015625&required_data=rain&filter=true",
          {
            headers: new Headers({
              method: "GET",
              Authorization: `Bearer ${API_TOKEN}`
            })
          }
        );

        console.log("result : ", result);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return <div>yoyo</div>;
}

export default Fetch;
