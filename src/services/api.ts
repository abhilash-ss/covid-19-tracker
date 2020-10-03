const HOST_VERSION = "v3"
const HOST_NAME = `https://disease.sh/`
const BASE_URL = `${HOST_NAME}${HOST_VERSION}/covid-19`;
const ALL_URL = `${BASE_URL}/all`;
const ALL_HISTORICAL_URL = `${BASE_URL}/historical/all`;
const COUNTRIES_URL = `${BASE_URL}/countries`;
const getCountries = async () => {
  try {
    const response = await fetch(`${COUNTRIES_URL}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getCovidInfo = async () => {
  try {
    const response = await fetch(`${ALL_URL}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getCovidInfoByCountryCode = async (countryCode: string) => {
  try {
    const response = await fetch(
      `${COUNTRIES_URL}/${countryCode}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getCovidHistory = async (days: number) => {
  try {
    const response = await fetch(
      `${ALL_HISTORICAL_URL}?lastdays=${days}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export {
  getCountries,
  getCovidInfo,
  getCovidInfoByCountryCode,
  getCovidHistory,
};
