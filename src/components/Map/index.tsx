import React, { FunctionComponent } from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import MapCircle from "../MapCircle";
import { CovidInfo } from "../../utils/interfaces";

import "./Map.scss";

interface Props {
  center: LatLngExpression;
  zoom: number;
  countries: CovidInfo[];
}

const Map: FunctionComponent<Props> = ({ center, zoom, countries }) => {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCircle data={countries}/>
      </LeafletMap>
    </div>
  );
};

export default Map;
