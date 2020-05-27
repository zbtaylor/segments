import React, { useState, useRef } from "react";
import { Map, ZoomControl, Polyline, Circle, TileLayer } from "react-leaflet";
import * as Axios from "axios";
import Tiles from "./Tiles";
import Points from "./Points";
import "../../../node_modules/leaflet/dist/leaflet.css";

const API_KEY =
  "pk.eyJ1IjoiemJ0YXlsb3IxIiwiYSI6ImNqY2dzZmtrNjI5OGcyd3VqaG9mcjI0M2gifQ.VjAqO_2sqVtneDmJGaRcGg";

const line = [
  [39.275378, -76.83193],
  [39.27485, -76.831858],
  [39.274384, -76.83181],
  [39.273832, -76.831762],
  [39.27336, -76.83173],
  [39.272919, -76.831713],
];

const MyMap = () => {
  const [center, setCenter] = useState([39.275378, -76.83193]);
  const [zoom, setZoom] = useState(16);
  const [coords, setCoords] = useState([]);
  const mapRef = useRef(null);
  const zoomRef = useRef(null);

  const handleClick = (evt) => {
    const map = mapRef.current;
    if (map != null) {
      const { lat, lng } = evt.latlng;
      setCoords([...coords, [lat, lng]]);
      if (coords.length > 0) {
        let radii = [];
        const newCoords = [...coords, [lat, lng]]
          .map((arr) => {
            radii.push("15");
            return arr.reverse().join();
          })
          .join(";");
        Axios.get(
          `https://api.mapbox.com/matching/v5/mapbox/driving/${newCoords}.json?radiuses=${radii.join(
            ";"
          )}&steps=true&geometries=geojson&access_token=${API_KEY}`
        ).then((res) => {
          if (res.data.code != "NoMatch") {
            const { matchings } = res.data;
            const route = matchings[0].geometry.coordinates.map((arr) => {
              return arr.reverse();
            });
            setCoords(route);
          }
        });
      }
    }
  };

  const handleZoom = (evt) => {
    const zoomCtrl = zoomRef.current;
    if (zoomCtrl != null) {
      setZoom(evt.target._zoom);
    }
  };

  return (
    <Map
      ref={mapRef}
      onClick={handleClick}
      zoomControl={false}
      onZoom={handleZoom}
      zoom={zoom}
      minZoom={14}
      center={center}
      id="map"
    >
      <Tiles />
      <ZoomControl ref={zoomRef} onZoom={handleZoom} position="topleft" />
      <Polyline positions={coords} color="#e91e63" />
      <Points zoom={zoom} coords={coords} />
    </Map>
  );
};

export default MyMap;
