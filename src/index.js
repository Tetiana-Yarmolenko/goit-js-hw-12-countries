import './styles.css';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import debounce from 'lodash.debounce';

import countryCardTpl from '../tamplate/country.hbs';
import countriesListCardTpl from '../tamplate/countries.hbs';

import API from './js/fetchCountries';
import getRefs from './js/get-refs'


const { error, success } = require('@pnotify/core');
// дані з розмітки
const refs = getRefs();

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

  clearList();
  API.fetchCountries(searchQuery)
    .then(country => {
      if (country.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
      else if (country.length >= 2 && country.length <= 10) {
        renderCountriesCard(country);
      }
      else if (country.length === 1) {
        renderCountryCard(country);
        success({
         title: 'Success!',
         text: 'That thing that you were trying to do worked.',
        });
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

