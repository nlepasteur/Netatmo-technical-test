export const initialState = {
  load: true,
  error: false,
  temperature: "",
  humidity: "",
  pressure: ""
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "TEMPERATURE":
      return {
        ...state,
        load: false,
        error: false,
        temperature: Math.round(action.measure)
      };
    case "HUMIDITY":
      return {
        ...state,
        load: false,
        error: false,
        humidity: Math.round(action.measure)
      };
    case "PRESSURE":
      return {
        ...state,
        pressure: Math.round(action.measure)
      };
    case "FETCH_ERROR":
      return {
        ...state,
        load: true,
        error: "Something went wrong"
      };
    default:
      return state;
  }
};
