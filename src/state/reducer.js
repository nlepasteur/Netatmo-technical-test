export const initialState = {
  load: true,
  error: "",
  temperature: "",
  humidity: ""
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "TEMPERATURE":
      return {
        ...state,
        load: false,
        error: "",
        temperature: action.measure
      };
    case "HUMIDITY":
      return {
        ...state,
        load: false,
        error: "",
        humidity: action.measure
      };
    case "FETCH_ERROR":
      return {
        ...state,
        load: false,
        error: "Something went wrong"
      };
    default:
      return state;
  }
};
