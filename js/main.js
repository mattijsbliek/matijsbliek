/**
 * - Get albums from API
 * - Click to open album
 * - Click track to play
 */
import Cycle from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import App from './components/App';

const targetElm = document.querySelector('main')
targetElm.innerHTML = '';

const main = App;

const drivers = {
  DOM: makeDOMDriver('main'),
  HTTP: makeHTTPDriver()
}

Cycle.run(main, drivers);
