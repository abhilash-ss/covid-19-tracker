import React, { useEffect, useState, ChangeEvent } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";

import {
  getCountries,
  getCovidInfo,
  getCovidInfoByCountryCode,
} from "./services/api";

import { sortData, prettyPrintStat } from "./utils/functions";
import { CovidInfo } from "./utils/interfaces";

import "leaflet/dist/leaflet.css";
import "./App.scss";

interface Country {
  name: string;
  value: string;
}

interface CountryListResponse {
  country: string;
  countryInfo: { iso3: string };
}

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<string>(""); // https://material-ui.com/guides/typescript/
  const [covidInfo, setCovidInfo] = useState<CovidInfo | undefined>(undefined);
  const [tableData, setTableData] = useState<CovidInfo[]>([]);
  const [mapCountries, setMapCountries] = useState<CovidInfo[]>([]);
  const [mapData, setMapData] = useState({
    lat: 34.80746,
    lng: -40.4796,
    zoom: 3,
  });
  const [casesType, setCasesType] = useState<"cases" | "deaths" | "recovered">(
    "cases"
  );

  useEffect(() => {
    const getCountriesList = async () => {
      const response: CovidInfo[] = await getCountries();

      const countryList = response.map((country: CovidInfo) => ({
        name: country.country,
        value: country.countryInfo.iso3,
      }));

      countryList.unshift({ name: "Woldwide", value: "worldWide" });

      setCountries(countryList);
      const sortedData: CovidInfo[] = sortData(response);
      setTableData(sortedData);
      setMapCountries(response);
      setCountry("worldWide");
    };

    getCountriesList();
  }, []);

  useEffect(() => {
    const fetchCovidInfo = async () => {
      const response = await getCovidInfo();
      setCovidInfo(response);
    };
    fetchCovidInfo();
  }, []);

  const onCountryChange = async (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const countryCode = event.target.value as string; // https://github.com/mui-org/material-ui/issues/16065

    let response: CovidInfo;
    if (countryCode === "worldWide") {
      response = await getCovidInfo();
    } else {
      response = await getCovidInfoByCountryCode(countryCode);
      setMapData({
        lat: response.countryInfo.lat,
        lng: response.countryInfo.long,
        zoom: 4,
      });
    }
    setCovidInfo(response);
    setCountry(event.target.value as string);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__drop-down" variant="outlined">
            <Select onChange={onCountryChange} value={country}>
              {countries.map((country: Country, index: number) => {
                return (
                  <MenuItem key={index.toString()} value={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="Coronavirus cases"
            uiType="alert"
            active={casesType === "cases"}
            cases={prettyPrintStat(covidInfo?.todayCases || 0)}
            total={prettyPrintStat(covidInfo?.cases || 0)}
            onClick={(e) => setCasesType("cases")}
          />
          <InfoBox
            title="Recovered"
            uiType="success"
            active={casesType === "recovered"}
            cases={prettyPrintStat(covidInfo?.todayRecovered || 0)}
            total={prettyPrintStat(covidInfo?.recovered || 0)}
            onClick={(e) => setCasesType("recovered")}
          />
          <InfoBox
            title="Deaths"
            uiType="alert"
            active={casesType === "deaths"}
            cases={prettyPrintStat(covidInfo?.todayDeaths || 0)}
            total={prettyPrintStat(covidInfo?.deaths || 0)}
            onClick={(e) => setCasesType("deaths")}
          />
        </div>
        <Map
          center={[mapData.lat, mapData.lng]}
          zoom={mapData.zoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div>
            <h3>Live cases by country</h3>
            <Table countries={tableData} />
          </div>
          <h3 className="app__graph-title">Worldwide new cases {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
