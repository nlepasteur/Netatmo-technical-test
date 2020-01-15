export const initialState = {
  load: true,
  error: false,
  temperature: "",
  humidity: "",
  pressure: "",
  wind_strength: "",
  gust_strength: "",
  rain_24h: "",
  rain_60min: "",
  rain_live: ""
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_MEASURES":
      return {
        temperature: action.temperature,
        humidity: action.humidity,
        pressure: action.pressure,
        wind_strength: action.wind_strength,
        gust_strength: action.gust_strength,
        rain_24h: action.rain_24h,
        rain_60min: action.rain_60min,
        rain_live: action.rain_live,
        load: false
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: "Something went wrong"
      };
    default:
      return state;
  }
};
