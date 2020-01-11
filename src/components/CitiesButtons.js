import React from "react";

function CitiesButtons({ updateCity }) {
  return (
    <div>
      <button onClick={updateCity} name="paris">
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
      </button>
    </div>
  );
}

export default CitiesButtons;
