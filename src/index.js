import './styles.css';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
  

import countryCardTpl from '../tamplate/country.hbs';
import countriesListCardTpl from '../tamplate/countries.hbs';
import debounce from 'lodash.debounce';
import API from './js/fetchCountries';
import getRefs from './js/get-refs'

const refs = getRefs();
const { error } = require('@pnotify/core');

refs.search.addEventListener(`input`, debounce(onSearch, 500));
 
// одна країна
function renderCountryCard(country) {
  const countryMarkup = countryCardTpl(country);
  refs.countriesList.innerHTML = countryMarkup;
}

// список країн
function renderCountriesCard(country) {
  const countriesListMarkup = countriesListCardTpl(country);
  refs.countriesList.innerHTML = countriesListMarkup;
}


function onSearch(e) {
  const searchQuery = e.target.value;
  console.log(searchQuery);
  clearList();
  API.fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
      else if (data.length >= 2 && data.length <= 10) {
        renderCountriesCard(data);
        // success();
      }
      else if (data.length === 1) {
        renderCountryCard(data);
      }
      else {
        error({
    title: 'Oh No!',
    text: 'No matches found with such query. Please, try to fill up another name of the country',
  });
      }
    })
}

function clearList() {
  refs.countriesList.innerHTML = '';
}

// function success() {
//   success({
//     title: 'Success!',
//     text: 'That thing that you were trying to do worked.',
//   });
// }