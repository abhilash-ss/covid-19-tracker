import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import "./Map.scss";

interface Props {
  center: LatLngExpression;
  zoom: number;
}

const Map = (props: Props) => {
  return (
    <div className="map">
      <LeafletMap center={props.center} zoom={props.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    </div>
  );
};

export default Map;
