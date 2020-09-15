import React, { useEffect, useState, ChangeEvent } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";

import MenuItem from "@material-ui/core/MenuItem";
import {
  getCountries,
  getCovidInfo,
  getCovidInfoByCountryCode,
} from "./services/api";

import { CovidInfo } from "./utils/interfaces";

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

  useEffect(() => {
    const getCountriesList = async () => {
      const response: CovidInfo[] = await getCountries();

      const countryList = response.map((country: CovidInfo) => ({
        name: country.country,
        value: country.countryInfo.iso3,
      }));

      countryList.unshift({ name: "Woldwide", value: "worldWide" });

      setCountries(countryList);
      setTableData(response);
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

    let response;
    if (countryCode === "worldWide") {
      response = await getCovidInfo();
    } else {
      response = await getCovidInfoByCountryCode(countryCode);
    }
    setCovidInfo(response);
    console.log("checking response", response);
    setCountry(event.target.value as string);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 tracker</h1>
          <FormControl className="app__drop-down" variant="outlined">
            {/* <InputLabel id="demo-simple-select-label">Country</InputLabel> */}
            <Select onChange={onCountryChange} value={country}>
              {countries.map((country: Country, index: number) => {
                console.log(country);
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
            cases={covidInfo?.todayCases || 0}
            total={covidInfo?.cases || 0}
          />
          <InfoBox
            title="Recovered"
            cases={covidInfo?.todayRecovered || 0}
            total={covidInfo?.recovered || 0}
          />
          <InfoBox
            title="Deaths"
            cases={covidInfo?.todayDeaths || 0}
            total={covidInfo?.deaths || 0}
          />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <div>
            <h3>Live cases by country</h3>
            <Table countries={tableData} />
          </div>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
