import React, { FunctionComponent } from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

import { CovidInfo } from "../../utils/interfaces";

import "./MapCircle.scss";

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
          <Popup>
            <div className="info-container">
              <div
                className="info-container__flag"
                style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
              />
              <div className="info-container__name">{country.country}</div>
              <div className="info-container__stats">
                Cases: {numeral(country.cases).format("0,0")}
              </div>
              <div className="info-container__stats">
                Recovered: {numeral(country.recovered).format("0,0")}
              </div>
              <div className="info-container__stats">
                Deaths: {numeral(country.deaths).format("0,0")}
              </div>
            </div>
          </Popup>
        </Circle>
      ))}
    </>
  );
};

export default MapCircle;
