import React, { useState, useRef } from "react";
import { Circle } from "react-leaflet";

const Points = ({ zoom, coords }) => {
  const radii = [
    2048,
    2048,
    2048,
    2048,
    2048,
    2048,
    2048,
    2048,
    2048,
    1024,
    512,
    256,
    128,
    64,
    32,
    16,
    8,
    4,
    2,
  ];

  return coords.map((c, i) => {
    return (
      <Circle
        center={c}
        stroke={false}
        fillOpacity={1.0}
        color="#f44336"
        radius={radii[zoom]}
        key={i}
        index={i}
      />
    );
  });
};

export default Points;
