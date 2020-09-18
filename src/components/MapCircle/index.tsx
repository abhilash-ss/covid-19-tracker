import React, { FunctionComponent } from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

import { CovidInfo } from "../../utils/interfaces";

import "./MapCircle.scss";

interface Props {
  data: CovidInfo[];
  casesType?: "cases" | "deaths" | "recovered";
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

const MapCircle: FunctionComponent<Props> = ({ data, casesType = "cases" }) => {
  return (
    <>
      {data.map((country: any, index: number) => (
        <Circle
          key={index.toString()}
          center={[country.countryInfo.lat, country.countryInfo.long]}
          fillOpacity={0.4}
          color={caseTypeColours[casesType].hex}
          fillColor={caseTypeColours[casesType].hex}
          radius={
            Math.sqrt(country[casesType]) *
            caseTypeColours[casesType].multiplier
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
