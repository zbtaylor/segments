import React from "react";
import { TileLayer } from "react-leaflet";

const Tiles = () => {
  const url = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MB_KEY}`;
  const attribution = `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`;

  return (
    <TileLayer
      id="mapbox/dark-v10"
      tileSize={512}
      zoomOffset={-1}
      url={url}
      attribution={attribution}
    />
  );
};

export default Tiles;
