
function fetchCountries(name) {
  const URL = `https://restcountries.eu/rest/v2/name/${name}`;
  return fetch(URL)
    .then(response => {
      return response.json();
    });
}

export default { fetchCountries };