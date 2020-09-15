const getCountries = async () => {
  try {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getCovidInfo = async () => {
  try {
    const response = await fetch(`https://disease.sh/v3/covid-19/all`);
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
      `https://disease.sh/v3/covid-19/countries/${countryCode}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { getCountries, getCovidInfo, getCovidInfoByCountryCode };
