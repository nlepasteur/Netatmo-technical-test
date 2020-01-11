import React from "react";
import { Link } from "react-router-dom";

function WeatherNav() {
  return (
    <div>
      <button>
        <Link to="/temperature">Temperature</Link>
      </button>
      <button>
        <Link to="/rain">Rain</Link>
      </button>
      <button>
        <Link to="/wind">Wind</Link>
      </button>
    </div>
  );
}

export default WeatherNav;
