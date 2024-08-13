import 'reset-css/reset.css';

import './styles.scss';

import './polyfills';

import './vendors';

import 'components';

/*
*
* We are using axios this version because of compatability with old browsers;
* url-search-params-polyfill is for the same goal;
* Bluebird is for promises for browsers that don't support them;
*
*/
