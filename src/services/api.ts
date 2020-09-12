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

export { getCountries };
