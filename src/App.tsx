import React, { useEffect, useState, ChangeEvent } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InfoBox from "./components/InfoBox";

import MenuItem from "@material-ui/core/MenuItem";
import { getCountries } from "./services/api";

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
  const [country, setCountry] = useState<unknown>(""); // https://material-ui.com/guides/typescript/

  useEffect(() => {
    const getCountriesList = async () => {
      const response: CountryListResponse[] = await getCountries();

      const countryList = response.map((country: CountryListResponse) => ({
        name: country.country,
        value: country.countryInfo.iso3,
      }));

      countryList.unshift({ name: "Woldwide", value: "WW" });

      setCountries(countryList);
      setCountry("WW");
    };

    getCountriesList();
  }, []);

  const onCountryChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    console.log("checking Event", event, event.target);
    setCountry(event.target.value);
  };

  return (
    <div className="app">
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
        <InfoBox title="Coronavirus cases" cases={123} total={234} />
        <InfoBox title="Recovered" cases={123} total={234} />
        <InfoBox title="Deaths" cases={123} total={234} />
      </div>
    </div>
  );
}

export default App;
