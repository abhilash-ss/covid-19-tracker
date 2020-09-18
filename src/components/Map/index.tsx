import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

interface Props {}

const Map = (props: Props) => {
  return (
    <div className="map">
      <LeafletMap>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    </div>
  );
};

export default Map;
