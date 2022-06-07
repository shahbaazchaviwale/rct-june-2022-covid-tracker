import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { showDataOnMap } from "./helper";

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView([coords[0], coords[1], map.getZoom()]);
  return null;
}

function Map({ countries, casesType, center, zoom, type }) {

  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView coords={center} />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
