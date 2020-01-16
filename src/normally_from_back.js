import axios from "axios"; // allow to create a header to use with axios.get

// here change token please to run this app
export const API_TOKEN =
  "5e1674428b2345000b592097|fa2fd29a930030d172bef89968323640";

export let api = axios.create({
  headers: {
    method: "GET",
    Authorization: `Bearer ${API_TOKEN}`
  }
});

// hardcoded data with cities localisation
export const localisation = {
  paris: {
    lat_ne: 48.86471476180278,
    lat_sw: 48.83579746243092,
    lon_ne: 2.373046875,
    lon_sw: 2.3291015625
  },
  new_york: {
    lat_ne: 40.97989806962013,
    lat_sw: 38.82259097617712,
    lon_ne: -81.5625,
    lon_sw: -81.5625
  },
  berlin: {
    lat_ne: 52.3755991766591,
    lat_sw: 4.915832801313174,
    lon_ne: -75.234375,
    lon_sw: -75.5859375
  },
  bogota: {
    lat_ne: 5.266007882805492,
    lat_sw: 4.915832801313174,
    lon_ne: -75.234375,
    lon_sw: -75.5859375
  }
};
