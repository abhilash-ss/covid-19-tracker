import React, { FunctionComponent } from "react";
import { Circle, Popup } from "react-leaflet";

import { CovidInfo } from "../../utils/interfaces";

interface Props {
  data: CovidInfo[];
  caseType?: "cases" | "deaths" | "recovered";
}

const caseTypeColours = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

const MapCircle: FunctionComponent<Props> = ({ data, caseType = "cases" }) => {
  return (
    <>
      {data.map((country: any) => (
        <Circle
          center={[country.countryInfo.lat, country.countryInfo.long]}
          fillOpacity={0.4}
          color={caseTypeColours[caseType].hex}
          fillColor={caseTypeColours[caseType].hex}
          radius={
            Math.sqrt(country[caseType]) * caseTypeColours[caseType].multiplier
          }
        >
          <Popup>Popup</Popup>
        </Circle>
      ))}
    </>
  );
};

export default MapCircle;
